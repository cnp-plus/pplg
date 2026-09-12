#!/usr/bin/env bash
# scripts/refresh-feed.sh — refresh Instagram feed di server, lalu rebuild + deploy.
#
# Dipasang sebagai cron harian pukul 00:00 WIB:
#   TZ=Asia/Jakarta
#   0 0 * * * /path/to/pplg/scripts/refresh-feed.sh >> /var/log/pplg-feed.log 2>&1
#
# Env:
#   INSTAGRAM_FEED_URL — WAJIB. URL JSON feed IG kelas (dari Behold.so widget).
#   APP_DIR            — project root (default: induk dari folder script ini)
#   WEB_ROOT           — docroot Nginx static (default: /var/www/pplg)
#   SKIP_BUILD         — "1" untuk berhenti setelah fetch saja (default: "0")
#
# Cara set INSTAGRAM_FEED_URL di server:
#   - export di crontab (lihat contoh di atas)
#   - atau /etc/environment  →  INSTAGRAM_FEED_URL=https://...
#   - atau systemd EnvironmentFile →  EnvironmentFile=/etc/pplg-env
#     (buat /etc/pplg-env berisi: INSTAGRAM_FEED_URL=https://...)
#
# Catatan: --keep-going pada fetch-instagram.mjs membuat script keluar 0
# meski feed gagal (instagram.json disorot tak berubah). Script ini mendeteksi
# kegagalan via perubahan mtime instagram.json.

set -euo pipefail

LOG_PREFIX="[refresh-feed]"
log() { echo "$LOG_PREFIX $*"; }

# --- Konfigurasi via env ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
WEB_ROOT="${WEB_ROOT:-/var/www/pplg}"
SKIP_BUILD="${SKIP_BUILD:-0}"

# --- INSTAGRAM_FEED_URL wajib ---
if [ -z "${INSTAGRAM_FEED_URL:-}" ]; then
  log "ERROR: INSTAGRAM_FEED_URL tidak diset."
  log "Set via crontab, /etc/environment, atau systemd EnvironmentFile."
  exit 1
fi

log "APP_DIR=$APP_DIR"
log "WEB_ROOT=$WEB_ROOT"
log "SKIP_BUILD=$SKIP_BUILD"

cd "$APP_DIR"

# --- Langkah 1: fetch Instagram feed ---
JSON_FILE="$APP_DIR/src/data/instagram.json"

# Catat mtime instagram.json sebelum fetch (untuk deteksi perubahan)
PRE_MTIME=0
if [ -f "$JSON_FILE" ]; then
  PRE_MTIME=$(stat -c %Y "$JSON_FILE" 2>/dev/null || echo 0)
fi

log "fetch Instagram feed via scripts/fetch-instagram.mjs --keep-going"
set +e
node scripts/fetch-instagram.mjs --keep-going
FETCH_RC=$?
set -e

# Hitung mtime setelah fetch
POST_MTIME=0
if [ -f "$JSON_FILE" ]; then
  POST_MTIME=$(stat -c %Y "$JSON_FILE" 2>/dev/null || echo 0)
fi

# Jika fetch gagal (exit code tak nol) → skip build, keluar 0
if [ "$FETCH_RC" -ne 0 ]; then
  log "Fetch gagal (exit code $FETCH_RC). Skip build. Keluar 0."
  exit 0
fi

# Jika feed gagal tapi --keep-going membuat exit 0, deteksi via mtime tak berubah
if [ "$PRE_MTIME" = "$POST_MTIME" ]; then
  log "Feed gagal (instagram.json tidak diupdate). Skip build. Keluar 0."
  exit 0
fi

log "Fetch berhasil. instagram.json diupdate."

# --- Langkah 2: SKIP_BUILD? ---
if [ "$SKIP_BUILD" = "1" ]; then
  log "SKIP_BUILD=1. Berhenti setelah fetch."
  exit 0
fi

# --- Langkah 3: build ---
log "npm run build"
npm run build

# --- Langkah 4: sync dist/ ke WEB_ROOT ---
log "sync dist/ -> $WEB_ROOT"
mkdir -p "$WEB_ROOT"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "dist/" "$WEB_ROOT/"
  log "rsync selesai."
else
  log "rsync tidak tersedia, fallback cp -r"
  cp -r "dist/." "$WEB_ROOT/"
  log "cp selesai."
fi

# --- Sync cv/ ke WEB_ROOT/cv/ ---
log "sync cv/ -> $WEB_ROOT/cv/"
mkdir -p "$WEB_ROOT/cv"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "cv/" "$WEB_ROOT/cv/"
  log "rsync cv selesai."
else
  log "rsync tidak tersedia, fallback cp -r cv"
  cp -r "cv/." "$WEB_ROOT/cv/"
  log "cp cv selesai."
fi

# --- Selesai ---
log "Refresh feed selesai pada $(date -u '+%Y-%m-%dT%H:%M:%SZ')."
log "Hint: buka http://<host>/ untuk verifikasi. Tidak perlu reload Nginx (static file)."
