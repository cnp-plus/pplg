# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Perintah

```bash
npm run dev             # dev server di http://localhost:5173
npm run build           # type check ketat (vue-tsc -b) + build produksi ke dist/
npm run preview         # pratinjau hasil build produksi
npm run fetch:instagram # regenerasi feed Instagram (lihat bagian Feed Instagram)
```

Tidak ada test suite atau linter — `npm run build` adalah gerbang verifikasi utama (gagal bila ada error tipe).

Offline test pipeline IG: `node scripts/fetch-instagram.mjs --input scripts/__fixtures__/feed.sample.json`

## Arsitektur

Situs statis satu halaman: Vue 3 (`<script setup>`) + TypeScript ketat + Vite + Tailwind CSS v4 (via `@tailwindcss/vite`). Tanpa router, tanpa backend — `App.vue` menyusun section berurutan: Hero → Tentang → Struktur → Prestasi → Kegiatan → Footer.

**Prinsip inti: data dan tampilan terpisah total.**

- **Semua konten** (identitas kelas, roster siswa/wali kelas per angkatan, statistik, prestasi, agenda, sosmed) hidup di `src/data/classData.ts`, bertipe lewat `src/data/types.ts`. Komponen hanya merender — mengubah konten tidak boleh menyentuh komponen.
- Gotcha penamaan: section **Prestasi** dirender oleh `ShowcaseSection.vue` (id `#prestasi`) — showcase projek sudah dihapus, nama file adalah sisa historis.
- `src/data/instagram.json` dan gambar di `public/ig/` adalah **file hasil generate script** — jangan edit manual.
- Token warna didefinisikan sebagai token Tailwind v4 di blok `@theme` pada `src/style.css`; sumber resminya `docs/color_palette.md`. Dilarang hardcode hex/konten di komponen.

### Sistem desain — `DESIGN.md` bersifat mengikat

Baca sebelum menambah/mengubah section. Poin yang paling sering dilanggar:

- Anti AI-slop: tanpa glow blob blur, gradient text, pill badge berlebih, grid kartu seragam untuk tipe konten berbeda, penomoran dekoratif (`// 01.`), animasi tanpa fungsi.
- Setiap permukaan/teks/border wajib punya pasangan `dark:` yang teruji. Dark mode via kelas `.dark` pada `<html>` (`@custom-variant dark` di `style.css`); jangan tambah hex baru ke `@theme`.
- Layout konsisten: container `max-w-6xl mx-auto px-6 sm:px-8`, section `py-20 lg:py-28` dengan border-b pemisah, heading section grid 12 kolom (judul `col-span-5`, narasi `col-span-7`), radius kecil (`rounded`/`rounded-lg`).
- Ikon brand (Instagram/GitHub) dari `src/components/icons/social.ts`, bukan lucide-vue-next (ikon brand di sana deprecated).

### Tema — `src/composables/useTheme.ts`

Biner terang/gelap, tanpa opsi "system". Skrip inline di `<head>` `index.html` memasang kelas `.dark` sebelum paint pertama (anti-FOUC): kunjungan pertama mengikuti `prefers-color-scheme` secara real-time; setelah pengguna toggle, pilihan tersimpan di localStorage key `pplg-theme` dan mengalahkan sistem.

### Motion — `src/composables/useReveal.ts`

anime.js v4 site-wide. Aturan: hanya animasikan `opacity` + `translateY`, easing `outCubic`, durasi pendek; hover/focus/menu tetap CSS transition; semua animasi JS di-skip saat `prefers-reduced-motion: reduce` (elemen langsung render final state — tidak pernah disembunyikan permanen di template/CSS). Elemen ditandai atribut `data-reveal` / `data-hero-reveal` / `data-tab-reveal`, direveal via IntersectionObserver atau on-mount; navbar statis tanpa entrance animation.

### Feed Instagram

URL CDN Instagram kadaluarsa dalam hitungan hari, sehingga gambar feed di-commit ke repo: `scripts/fetch-instagram.mjs` (zero-dependency ESM) mengambil JSON feed dari env `INSTAGRAM_FEED_URL` (atau fixture lokal via `--input <path>`), mengunduh maksimal 6 gambar ke `public/ig/<sanitized-id>.<ext>`, menulis `src/data/instagram.json`, dan membersihkan berkas lama yang tak lagi direferensi (kecuali bernama `sample-*`). Workflow `.github/workflows/refresh-instagram.yml` menjalankannya harian pukul 02:00 UTC atau manual (`workflow_dispatch`); butuh repository secret `INSTAGRAM_FEED_URL`. Section Kegiatan memiliki fallback timeline editorial bila `instagram.json` kosong.

## Konvensi

- Copy UI, dokumentasi, dan pesan commit dalam bahasa Indonesia, gaya Conventional Commits (mis. `feat(struktur): ...`).
- Sebelum commit: jalankan `npm run build`, lalu uji tampilan di viewport mobile dan di **kedua tema** (terang & gelap).
- Nama orang, sekolah, dan sebagian besar tautan di `classData.ts` masih placeholder fiktif (yang riil: IG kelas dan repo GitHub).
