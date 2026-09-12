#!/usr/bin/env bash
# scripts/dev-cv.sh — jalankan PHP built-in server untuk folder cv/ (dev lokal).
#
# Vite tidak mengeksekusi PHP. CV murid pakai PHP (cv/<nama>/index.php).
# PHP built-in server di port 8001, docroot cv/ — directory URL /cv/<nama>/
# resolve ke cv/<nama>/index.php otomatis. Vite proxy /cv/ -> 127.0.0.1:8001
# (lihat vite.config.ts server.proxy).
#
# Pakai: ./scripts/dev-cv.sh   (atau: make dev-cv)

set -euo pipefail

LOG_PREFIX="[dev-cv]"
log() { echo "$LOG_PREFIX $*"; }

CV_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/cv"
PORT="${PORT:-8001}"
HOST="${HOST:-127.0.0.1}"

if ! command -v php >/dev/null 2>&1; then
  log "ERROR: PHP tidak ditemukan di PATH. Pasang PHP 7.4+ untuk development CV."
  exit 1
fi

log "PHP ditemukan: $(php -v | head -1)"
log "Starting PHP built-in server di http://$HOST:$PORT (docroot: $CV_DIR)"
log "Vite akan proxy /cv/ ke sini. Jalankan 'npm run dev' di terminal terpisah."
log "Tekan Ctrl+C untuk berhenti."

php -S "$HOST:$PORT" -t "$CV_DIR"
