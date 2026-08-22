#!/usr/bin/env node
/**
 * fetch-instagram.mjs
 * Build-time Instagram feed pipeline for the fully-static PPLG site.
 *
 * Why this exists: Instagram CDN image URLs expire within days, but the site is
 * statically generated. So at *build/CI time* we fetch a JSON feed of the class
 * IG profile, download each post's image into `public/ig/` (committed to the
 * repo), and write `src/data/instagram.json` whose `mediaUrl` points at a LOCAL
 * `/ig/<id>.<ext>` path — never at an expiring CDN URL.
 *
 * Zero-dependency: only global `fetch`, `node:path`, `node:fs/promises`.
 *
 * Source (exactly one of):
 *   - INSTAGRAM_FEED_URL env var : remote JSON feed endpoint (HTTPS)
 *   - --input <path>             : local JSON fixture file (offline testing)
 *
 * Test isolation (optional, default to production paths):
 *   - OUTPUT_JSON_PATH : override where instagram.json is written
 *   - IG_OUTPUT_DIR    : override where images are downloaded
 */

import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  stat,
  unlink,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const SCRIPT_DIR = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");

const DEFAULT_JSON_PATH = path.join(PROJECT_ROOT, "src", "data", "instagram.json");
const DEFAULT_IG_DIR = path.join(PROJECT_ROOT, "public", "ig");

const MAX_POSTS = 6;
const LOG = "[fetch-instagram]";

// ---------------------------------------------------------------------------
// CLI parsing (tiny, dependency-free)
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = { input: null, keepGoing: false, help: false, unknown: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if ((a === "--input" || a === "-i") && i + 1 < argv.length) {
      args.input = argv[++i];
    } else if (a === "--keep-going") {
      args.keepGoing = true;
    } else if (a === "--help" || a === "-h") {
      args.help = true;
    } else {
      args.unknown.push(a);
    }
  }
  return args;
}

function printHelp() {
  console.log(`\
${LOG} — build-time Instagram feed pipeline
Usage:
  node scripts/fetch-instagram.mjs                          # uses INSTAGRAM_FEED_URL env var
  node scripts/fetch-instagram.mjs --input <fixture.json>   # offline: read local JSON fixture
  node scripts/fetch-instagram.mjs --keep-going             # exit 0 (not 1) on feed-fetch failure

Env:
  INSTAGRAM_FEED_URL   Remote JSON feed URL (used unless --input is given)
  OUTPUT_JSON_PATH     Override output json path (default: src/data/instagram.json)
  IG_OUTPUT_DIR        Override images dir    (default: public/ig)
`);
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function sanitizeId(id) {
  // Make an Instagram id safe as a filename; collapse runs of dots, trim dashes.
  return (
    String(id)
      .replace(/[^A-Za-z0-9._-]/g, "-")
      .replace(/\.+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

function normalizeMediaType(t) {
  const u = String(t || "").toUpperCase();
  if (u.includes("VIDEO")) return "VIDEO";
  if (u.includes("CAROUSEL") || u.includes("ALBUM")) return "CAROUSEL_ALBUM";
  return "IMAGE";
}

// Pick the first present (non-empty) value from a list of candidate keys,
// transparently accepting both camelCase and snake_case variants.
function pick(obj, keys) {
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const v = obj[k];
      if (v !== undefined && v !== null && v !== "") return v;
    }
  }
  return undefined;
}

function normalizePost(entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;

  const id = pick(entry, ["id", "media_id", "shortcode", "code"]);
  const permalink = pick(entry, ["permalink", "link", "post_url", "url"]);
  const caption = pick(entry, ["caption", "caption_text", "text", "description"]) ?? "";
  const timestamp = pick(
    entry,
    ["timestamp", "media_timestamp", "taken_at", "created_time", "createdAt", "created_at"]
  );
  const mediaType = pick(entry, ["media_type", "mediaType", "type"]) ?? "IMAGE";
  const mediaUrl = pick(entry, ["media_url", "mediaUrl", "image_url", "url", "images", "image"]);
  const thumbnailUrl = pick(entry, [
    "thumbnail_url",
    "thumbnailUrl",
    "thumbnail",
    "preview",
    "thumbnail_src",
  ]);

  const isVideo = /VIDEO|CAROUSEL/i.test(String(mediaType));
  // VIDEO / CAROUSEL_ALBUM posts have no directly usable image; they need a
  // thumbnail. Without one, the post is unusable -> skip entirely.
  const imageUrl =
    isVideo && thumbnailUrl ? String(thumbnailUrl) : mediaUrl ? String(mediaUrl) : "";

  if (!id || !permalink || !imageUrl) return null;

  return {
    id: String(id),
    permalink: String(permalink),
    mediaType: normalizeMediaType(mediaType),
    caption: String(caption),
    timestamp: timestamp ? String(timestamp) : "",
    imageUrl,
  };
}

// Accept a top-level array, { posts }, { media }, { data }, { items }, or a
// Behold.so-style { edges: [{ node: ... }] } payload.
function extractPosts(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === "object") {
    for (const k of ["posts", "media", "data", "items"]) {
      if (Array.isArray(raw[k])) return raw[k];
    }
    if (Array.isArray(raw.edges)) {
      return raw.edges.map((e) => (e && e.node ? e.node : e)).filter(Boolean);
    }
  }
  return [];
}

function compareTs(ts) {
  if (!ts) return 0;
  const n = Date.parse(ts);
  return Number.isNaN(n) ? 0 : n;
}

function extFromContentType(ct) {
  if (!ct) return "jpg";
  const l = ct.toLowerCase();
  if (l.includes("jpeg") || l.includes("jpg")) return "jpg";
  if (l.includes("png")) return "png";
  if (l.includes("webp")) return "webp";
  if (l.includes("gif")) return "webp"; // normalise animated -> static webp slot is fine
  return "jpg";
}

// Sniff a real extension from magic bytes (used for local fixture copies).
function extFromBuffer(buf) {
  if (!buf || buf.length < 3) return "jpg";
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  )
    return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  )
    return "webp";
  return "jpg";
}

// Resolve a local image path from a fixture: try cwd, the fixture's own dir,
// then the project root — returning the first existing regular file.
async function resolveLocalPath(value, fixtureDir) {
  const candidates = [
    path.resolve(process.cwd(), value),
    fixtureDir ? path.resolve(fixtureDir, value) : null,
    path.resolve(PROJECT_ROOT, value),
  ].filter(Boolean);
  for (const c of candidates) {
    if (await fileExists(c) && (await stat(c)).isFile()) return c;
  }
  return null;
}

// Returns { buffer, ext } for a usable image, or null if none usable.
async function fetchImage(imageUrl, fixtureDir) {
  if (!imageUrl) return null;

  // Remote image (http/https): use the content-type header for the extension.
  if (/^https?:\/\//i.test(imageUrl)) {
    let res;
    try {
      res = await fetch(imageUrl);
    } catch {
      return null;
    }
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!/^image\//i.test(ct)) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) return null;
    return { buffer: buf, ext: extFromContentType(ct) };
  }

  // Local image referenced by a fixture: copy the file, sniff its real type.
  const resolved = await resolveLocalPath(imageUrl, fixtureDir);
  if (!resolved) return null;
  const buf = Buffer.from(await readFile(resolved));
  if (!buf.length) return null;
  return { buffer: buf, ext: extFromBuffer(buf) };
}

// Claim a filename for this run. Determined in-memory (not by probing the
// filesystem) so a given post id always maps to a stable `/ig/<id>.<ext>`.
// Re-runs therefore overwrite the previous file of the same name and stale
// files of a *different* name are pruned — no growing "-1/-2" suffixes.
const usedNames = new Set();
function claimName(base, ext) {
  let name = `${base}.${ext}`;
  let n = 1;
  while (usedNames.has(name)) {
    n++;
    name = `${base}-${n}.${ext}`;
  }
  usedNames.add(name);
  return name;
}

// On feed-fetch failure: never touch the existing json; exit 1 (or 0 w/ --keep-going).
function handleFeedFailure(keepGoing, msg) {
  console.error(`${LOG} ERROR: ${msg}`);
  console.error(`${LOG} Existing instagram.json left untouched.`);
  if (keepGoing) {
    console.warn(`${LOG} --keep-going set: exiting 0 despite feed failure.`);
    process.exit(0);
  }
  process.exit(1);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  if (args.unknown.length) {
    console.error(`${LOG} Ignored unknown: ${args.unknown.join(" ")}`);
  }
  process.exit(0);
}

const jsonPath = process.env.OUTPUT_JSON_PATH || DEFAULT_JSON_PATH;
const igDir = process.env.IG_OUTPUT_DIR || DEFAULT_IG_DIR;

let rawJson;
let fixtureDir = null;

if (args.input) {
  // --- Offline fixture mode ---
  const inputPath = path.resolve(args.input);
  if (!(await fileExists(inputPath))) {
    console.error(`${LOG} ERROR: input fixture not found: ${inputPath}`);
    process.exit(1);
  }
  fixtureDir = path.dirname(inputPath);
  try {
    rawJson = JSON.parse(await readFile(inputPath, "utf8"));
  } catch (e) {
    console.error(`${LOG} ERROR: failed to parse input fixture JSON: ${e.message}`);
    process.exit(1);
  }
} else {
  // --- Remote feed mode ---
  const feedUrl = process.env.INSTAGRAM_FEED_URL;
  if (!feedUrl) {
    console.error(
      `${LOG} ERROR: no source configured. Set INSTAGRAM_FEED_URL env var or pass --input <fixture.json>.`
    );
    printHelp();
    process.exit(1);
  }
  let res;
  try {
    res = await fetch(feedUrl);
  } catch (e) {
    handleFeedFailure(args.keepGoing, `failed to fetch INSTAGRAM_FEED_URL: ${e.message}`);
  }
  if (!res.ok) {
    handleFeedFailure(
      args.keepGoing,
      `feed request failed (${res.status} ${res.statusText})`
    );
  }
  try {
    rawJson = JSON.parse(await res.text());
  } catch (e) {
    handleFeedFailure(args.keepGoing, `failed to parse feed JSON: ${e.message}`);
  }
}

// Normalize + filter + sort newest-first.
const entries = extractPosts(rawJson);
const normalized = entries
  .map(normalizePost)
  .filter((p) => p !== null)
  .sort((a, b) => compareTs(b.timestamp) - compareTs(a.timestamp));

const top = normalized.slice(0, MAX_POSTS);

// Ensure image output dir exists.
await mkdir(igDir, { recursive: true });

const written = [];
let downloaded = 0;
let skipped = 0;

for (const p of top) {
  const img = await fetchImage(p.imageUrl, fixtureDir);
  if (!img) {
    skipped++;
    console.warn(
      `${LOG} WARN: no usable image for post "${p.id}" (${p.permalink}); skipped.`
    );
    continue;
  }
  const base = sanitizeId(p.id);
  const name = claimName(base, img.ext);
  await writeFile(path.join(igDir, name), img.buffer);
  downloaded++;
  written.push({
    id: p.id,
    permalink: p.permalink,
    mediaType: p.mediaType,
    caption: p.caption,
    timestamp: p.timestamp,
    mediaUrl: `/ig/${name}`,
  });
}

// Prune stale image files (never touch sample-* designer placeholders).
const kept = new Set(written.map((p) => path.basename(p.mediaUrl)));
let pruned = 0;
try {
  for (const f of await readdir(igDir)) {
    if (f.startsWith("sample-")) continue; // designer placeholders — never delete
    const full = path.join(igDir, f);
    try {
      if ((await stat(full)).isDirectory()) continue;
    } catch {
      continue;
    }
    if (kept.has(f)) continue;
    await unlink(full).catch(() => {});
    pruned++;
  }
} catch {
  /* igDir did not exist; nothing to prune */
}

// Write the contract JSON (local /ig/<id> paths only).
const output = { fetchedAt: new Date().toISOString(), posts: written };
await mkdir(path.dirname(jsonPath), { recursive: true });
// Only write once everything succeeded; partial results would be misleading.
await writeFile(jsonPath, JSON.stringify(output, null, 2) + "\n");

// Summary
console.log(`${LOG} Source: ${args.input ? `local fixture (${path.resolve(args.input)})` : `remote feed`}`);
console.log(`${LOG} Valid posts normalized: ${normalized.length} (capped at ${MAX_POSTS}).`);
console.log(`${LOG} Wrote ${written.length} posts to ${jsonPath}.`);
console.log(`${LOG} Images: ${downloaded} written, ${skipped} skipped (unusable image), ${pruned} pruned.`);
