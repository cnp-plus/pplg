# AGENTS.md

## Cepat mulai

```bash
npm install
npm run dev          # localhost:5173
npm run build        # vue-tsc + vite build — satu-satunya gerbang verifikasi (tidak ada test/linter)
```

## Arsitektur

Situs statis satu halaman (Vue 3 `<script setup>` + TS + Vite 8 + Tailwind CSS v4).

**Urutan section** (di `App.vue`):

```
HeroSection → AboutSection → StructureSection → AchievementsSection → ActivitiesSection → FooterSection
```

> **Perhatikan nama file**: komponen Hero bernama `HeroSection.vue` (bukan `Hero.vue`);
> komponen prestasi bernama `AchievementsSection.vue` (bukan `ShowcaseSection.vue`).

**Prinsip data / tampilan terpisah:**

- Semua konten (roster siswa/wali kelas per angkatan, statistik, prestasi, sosmed, dll.) hidup di
  `src/data/classData.ts` dengan tipe dari `src/data/types.ts`. Komponen hanya merender.
- `src/data/instagram.json` + `public/ig/*` adalah **file hasil generate** oleh
  `scripts/fetch-instagram.mjs` — jangan edit manual; placeholder awal di-commit sengaja
  sampai pipeline pertama kali jalan.

## Token warna

Didefinisikan di blok `@theme` pada `src/style.css`; sumber resminya `docs/color_palette.md`.
**Dilarang hardcode hex di komponen** — gunakan utility token (`bg-primary-700`, `text-neutral-500`, dll.).

## Tema (terang / gelap)

- Biner: terang ↔ gelap via tombol di navbar. Kunjungan pertama tanpa pilihan tersimpan
  mengikuti `prefers-color-scheme` secara real-time.
- Anti-FOUC: skrip inline di `<head>` `index.html` memasang kelas `.dark` sebelum paint pertama.
- Pilihan disimpan di `localStorage` key `pplg-theme` dan mengalahkan sistem.
- Dark mode pakai `@custom-variant dark (&:where(.dark, .dark *))` di `style.css`;
  setiap komponen wajib punya pasangan `dark:` yang teruji.

## Motion (anime.js v4)

Semua animasi JS ada di `src/composables/useReveal.ts`. Aturan:

- Hanya `opacity` + `translateY`, easing `outCubic`, durasi pendek.
- Semua animasi di-skip saat `prefers-reduced-motion: reduce`.
- Elemen ditandai `data-reveal` / `data-hero-reveal` / `data-tab-reveal`.
- Navbar statis tanpa entrance animation.
- Hover/focus/menu tetap CSS transition — anime.js tidak menyentuh micro-interaction.

## Ikon brand

Gunakan `src/components/icons/social.ts` (`IconInstagram`, `IconGithub`), **bukan** `lucide-vue-next`
(ikon brand di sana deprecated). Ikon lain dari lucide-vue-next masih aman.

## Design rules (wajib baca)

Baca `DESIGN.md` sebelum menambah/mengubah section. Paling sering dilanggar:

- Anti-slop: tanpa glow blob, gradient text, pill badge berlebih, grid kartu seragam untuk
  tipe konten berbeda, penomoran dekoratif (`// 01.`), animasi tanpa fungsi.
- Heading section: grid 12 kolom (`col-span-5` judul, `col-span-7` narasi).
- Container konsisten: `max-w-6xl mx-auto px-6 sm:px-8`, section `py-20 lg:py-28` + `border-b`.

## Struktur kelas (Section Struktur)

Tiga tab angkatan (12, 11, 10 — default 12) dengan `role="tablist"`.
Per angkatan: wali kelas (2 kartu semester 1 & 2) → pasangan ketua & wakil di baris pertama
(ditelengahonkan pada layar ≥md) → 32 siswa = 8 baris penuh @4 kolom.

## Instagram feed

```
INSTAGRAM_FEED_URL="https://..." npm run fetch:instagram   # remote
npm run fetch:instagram -- --input scripts/__fixtures__/feed.sample.json  # local test
```

Gambar diunduh ke `public/ig/` (bukan CDN URL — CDN kadaluarsa).
Refresh via `scripts/refresh-feed.sh` cron harian 00:00 WIB di server; butuh env `INSTAGRAM_FEED_URL`.

## Komitmen

- Bahasa Indonesia, gaya Conventional Commits.
- Sebelum commit: `npm run build`, cek kedua tema, cek tampilan di viewport mobile.
- Nama orang/sekolah/tautan di `classData.ts` masih placeholder fiktif kecuali IG kelas dan repo GitHub.
