#!/usr/bin/env node
/**
 * scripts/ensure-instagram.mjs
 * Fallback generator untuk instagram.json pada fresh clone.
 *
 * ActivitiesSection.vue melakukan `import feedData from "../data/instagram.json"` (statis).
 * Jika file tidak ada, vue-tsc & vite build akan gagal. Script ini dijalankan via
 * `prebuild` npm — menciptakan fallback kosong { fetchedAt, posts: [] } jika belum ada,
 * sehingga build selalu berhasil. Server mengisi data asli via scripts/refresh-feed.sh.
 *
 * Idempotent: tidak overwrite jika file sudah ada.
 */

import { stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const SCRIPT_DIR = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");

const JSON_PATH = path.join(PROJECT_ROOT, "src", "data", "instagram.json");
const LOG = "[ensure-instagram]";

try {
  await stat(JSON_PATH);
  console.log(`${LOG} instagram.json sudah ada, tidak ditimpa.`);
} catch {
  await mkdir(path.dirname(JSON_PATH), { recursive: true });
  const fallback = {
    fetchedAt: new Date().toISOString(),
    posts: [],
  };
  await writeFile(JSON_PATH, JSON.stringify(fallback, null, 2) + "\n", "utf8");
  console.log(`${LOG} instagram.json tidak ditemukan — fallback kosong diciptakan di ${JSON_PATH}.`);
}
