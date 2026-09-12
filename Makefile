# Makefile — wrapper ringkas untuk perintah npm proyek PPLG 1
# Setara dengan: npm run <target>

.PHONY: help install dev dev-cv build preview fetch-ig test-fetch-ig refresh-feed deploy clean

help: ## Tampilkan bantuan seluruh target
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Pasang dependensi (npm install)
	npm install

dev: ## Server pengembangan di http://localhost:5173
	npm run dev

dev-cv: ## Jalankan PHP built-in server untuk CV (dev lokal, port 8001)
	./scripts/dev-cv.sh

build: ## Type check (vue-tsc) + build produksi ke dist/
	npm run build

preview: ## Pratinjau hasil build produksi
	npm run preview

fetch-ig: ## Regenerasi feed Instagram dari INSTAGRAM_FEED_URL
	npm run fetch:instagram

test-fetch-ig: ## Uji pipeline IG dengan fixture lokal (offline)
	npm run fetch:instagram -- --input scripts/__fixtures__/feed.sample.json

refresh-feed: ## Refresh Instagram feed di server (fetch + build + deploy via cron)
	./scripts/refresh-feed.sh

deploy: ## Deploy ke VPS/Nginx static (git pull + build + rsync ke WEB_ROOT)
	./scripts/deploy.sh

clean: ## Hapus artefak build
	rm -rf dist
