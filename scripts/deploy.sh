#!/usr/bin/env bash
# scripts/deploy.sh — deploy manual/awal ke VPS (Linux + Nginx static).
#
# Ringkasan alur:
#   cd APP_DIR → git pull --ff-only → npm ci → npm run build → rsync dist/ ke WEB_ROOT
#
# Env (opsional, semua punya default):
#   APP_DIR    — path ke project root (default: induk dari folder script ini)
#   WEB_ROOT   — docroot Nginx static (default: /var/www/pplg)
#
# Static copy tidak memerlukan reload Nginx — cukup copy ulang ke WEB_ROOT.
# Setelah selesai, buka http://<host>/ untuk verifikasi.
#
# Contoh pakai:
#   WEB_ROOT=/var/www/pplg ./scripts/deploy.sh

set -euo pipefail

LOG_PREFIX="[deploy]"
log() { echo "$LOG_PREFIX $*"; }

# --- Konfigurasi via env ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"
WEB_ROOT="${WEB_ROOT:-/var/www/pplg}"

log "APP_DIR=$APP_DIR"
log "WEB_ROOT=$WEB_ROOT"

# --- Langkah 1: cd ke project root ---
cd "$APP_DIR"

# --- Langkah 2: git pull --ff-only (toleran jika bukan git repo) ---
if [ -d .git ]; then
  log "git pull --ff-only"
  git pull --ff-only || log "WARN: git pull gagal/skip — mungkin tidak ada perubahan atau bukan repo git."
else
  log "WARN: bukan repo git (.git tidak ditemukan), skip git pull."
fi

# --- Langkah 3: install dependensi ---
if [ -f package-lock.json ]; then
  log "npm ci"
  npm ci
else
  log "package-lock.json tidak ada, fallback ke npm install"
  npm install
fi

# --- Langkah 4: build (vue-tsc + vite build) ---
log "npm run build"
npm run build

# --- Langkah 5: sync dist/ ke WEB_ROOT ---
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

# --- Selesai ---
log "Deploy berhasil pada $(date -u '+%Y-%m-%dT%H:%M:%SZ')."
log "Hint: buka http://<host>/ untuk verifikasi. Tidak perlu reload Nginx (static file)."
