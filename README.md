# Website Kelas PPLG 1

Website statis satu halaman untuk kelas **PPLG 1** (Pengembangan Perangkat Lunak dan Gim) — menampilkan profil kelas, struktur pengurus & siswa per angkatan, prestasi, dokumentasi kegiatan (feed Instagram), dan kontak. Tema terang/gelap dengan toggle di navbar; kunjungan pertama otomatis ikut sistem.

## Teknologi

- [Vue 3](https://vuejs.org/) — `<script setup>` + Composition API
- [TypeScript](https://www.typescriptlang.org/) — type check ketat via `vue-tsc`
- [Vite](https://vite.dev/) — dev server & build produksi
- [Tailwind CSS v4](https://tailwindcss.com/) — via plugin `@tailwindcss/vite`, token warna didefinisikan di `src/style.css` (`@theme`)
- [anime.js v4](https://animejs.com/) — motion system: entrance reveal-on-scroll, staggered grid, stat count-up
- [lucide-vue-next](https://lucide.dev/) — ikon

## Menjalankan Proyek

```bash
npm install     # pasang dependensi
npm run dev     # server pengembangan (http://localhost:5173)
npm run build   # build produksi + type check (hasil di dist/)
npm run preview # pratinjau hasil build produksi
```

## Struktur Proyek

```
├── DESIGN.md                   # ⭐ Sistem desain & aturan anti-slop
├── docs/
│   └── color_palette.md        # Sumber resmi palet warna
├── public/
│   └── favicon.svg             # Favicon kelas (monogram < 1 >)
├── src/
│   ├── components/             # Satu komponen per section
│   │   ├── Navbar.vue          # Navigasi sticky + toggle terang/gelap + menu mobile
│   │   ├── Hero.vue            # Hero tipografi editorial + strip metrik
│   │   ├── AboutSection.vue    # Profil wali kelas, visi, pilar keahlian
│   │   ├── StructureSection.vue# Pengurus harian (ledger) & divisi teknis
│   │   ├── ShowcaseSection.vue # Karya siswa (baris asimetris) + prestasi (ledger)
│   │   ├── ActivitiesSection.vue # Timeline dokumentasi kegiatan
│   │   └── FooterSection.vue   # Kontak, sosmed, form pesan (mailto)
│   ├── composables/            # Composable (useTheme untuk tema terang/gelap, useReveal untuk motion anime.js)
│   ├── data/
│   │   ├── types.ts            # Interface TypeScript semua data
│   │   └── classData.ts        # ⭐ SEMUA KONTEN KELAS ADA DI SINI
│   ├── App.vue                 # Komposisi seluruh section
│   ├── main.ts                 # Entry point
│   └── style.css               # Token Tailwind (@theme) + utilitas grid
└── index.html                  # Meta, font Google (Plus Jakarta Sans, Fira Code)
```

## Mengubah Konten Kelas

Seluruh konten terpusat di **`src/data/classData.ts`** — tidak perlu menyentuh komponen:

| Data | Konstanta |
| :--- | :--- |
| Nama kelas, sekolah, wali kelas, sosmed, kontak | `classConfig` |
| Menu navigasi | `navItems` |
| Statistik hero | `statsData` |
| Fokus keahlian (web/mobile/gim) | `focusAreas` |
| Pengurus harian (ketua, sekretaris, dll.) | `classLeaders` |
| Divisi teknis + projek berjalan | `divisionsData` |
| Showcase projek siswa (repo/demo link) | `showcaseProjects` |
| Prestasi lomba | `achievementsData` |
| Agenda kegiatan | `activitiesData` |

> Saat ini semua nama orang, sekolah, tautan repo/demo, dan sosmed adalah **placeholder fiktif** — ganti dengan data kelas yang sebenarnya.

## Feed Instagram (section Kegiatan)

Section **Kegiatan** menampilkan jejak *feed* Instagram kelas secara **statis**. Karena Instagram CDN image URL kadaluarsa dalam hitungan hari, gambar tidak pernah disimpan sebagai URL CDN — melainkan **diunduh ke dalam repo** pada waktu build, lalu ditulis ke `src/data/instagram.json` dengan path lokal `/ig/<id>.<ext>`. Frontend hanya membaca JSON + melayani berkas gambar statis dari `public/ig/`.

**Alurnya:**

1. `scripts/fetch-instagram.mjs` (zero-dependency, ESM) membaca JSON feed profil IG dari `INSTAGRAM_FEED_URL`, atau dari fixture lokal via `--input <path>`.
2. Script menormalkan defensif entry (menerima top-level array, `{ posts }`, atau varian `media`/`data`/`edges`; serta kunci `snake_case` dan `camelCase`), mengurutkan berdasarkan `timestamp` (terbaru dulu), lalu mengambil **maksimal 6** posting.
3. Setiap gambar diunduh/disalin ke `public/ig/<sanitized-id>.<ext>` (ekstensi dari `Content-Type` untuk URL jarak jauh, atau *magic bytes* untuk berkas lokal). Posting **VIDEO**/*CAROUSEL* memakai `thumbnail_url`; posting tanpa gambar yang dapat pakai **dilewati**.
4. Hasil ditulis ke `src/data/instagram.json` (`fetchedAt` + `posts` dengan `mediaUrl` lokal `/ig/...`).
5. Berkas lama di `public/ig/` yang tidak lagi direferensi **dibersihkan** — *kecuali* berkas bernama `sample-*` (placeholder designer, tidak pernah dihapus).

**Menyiapkan feed asli (produksi):**

1. Buat widget feed publik IG kelas di [Behold.so](https://behold.so) dan salin URL JSON feed-nya.
2. Di repo GitHub, buka *Settings → Secrets and variables → Actions* → **New repository secret** bernama `INSTAGRAM_FEED_URL`, rekatkan URL feed.
3. Workflow **`.github/workflows/refresh-instagram.yml`** otomatis mengambil ulang tiap hari pukul **02:00 UTC** (`schedule: cron '0 2 * * *'`) **atau** bisa dipicu manual lewat *Run workflow* (`workflow_dispatch`). Bila ada perubahan pada `src/data/instagram.json` atau `public/ig/`, workflow meng-commit dengan pesan `chore: refresh instagram feed` dan mendorongnya.

**Menjalankan secara lokal:**

```bash
# Pakai feed langsung (perlu koneksi jaringan)
INSTAGRAM_FEED_URL="https://..." npm run fetch:instagram

# Atau pakai fixture lokal (offline, cocok untuk pengembangan & CI)
node scripts/fetch-instagram.mjs --input scripts/__fixtures__/feed.sample.json
```

> **Catatan:** `src/data/instagram.json` dan gambar di `public/ig/` adalah berkas **hasil** (generated). Jangan diedit tangan — jalankan kembali skrip atau biarkan workflow yang menggenerasinya. Placeholder `sample-*.svg` di `public/ig/` disimpan skrip tak terhapuskan; setelah feed asli aktif, posting sampel di JSON diganti secara alami oleh posting riil, dan berkas SVG placeholder dapat dihapus manual bila tidak lagi dipakai.

## Palet Warna & Desain

Warna mengikuti [`docs/color_palette.md`](docs/color_palette.md) dan sudah dipetakan sebagai token Tailwind v4 di `src/style.css`. Gunakan utility token (mis. `bg-primary-700`, `text-neutral-500`) — jangan hardcode kode hex di komponen.

Arah visual, anatomi section, dan aturan desain (termasuk daftar pola AI-slop yang dilarang) didokumentasikan lengkap di **[`DESIGN.md`](DESIGN.md)** — baca sebelum menambah section baru.

## Catatan

- Form "Kirim Pesan" di footer bekerja tanpa backend: membuka aplikasi email dengan isi pesan terisi otomatis (`mailto:`) ke email kelas.
- **Tema**: Toggle di navbar beralih antara mode Terang dan Gelap (tanpa opsi "system"). Pilihan disimpan di localStorage (`pplg-theme`). Kunjungan pertama tanpa pilihan tersimpan otomatis mengikuti preferensi OS secara real-time.
- Situs sepenuhnya statis — hasil build di `dist/` bisa di-deploy ke Netlify, Vercel, GitHub Pages, atau hosting statis apa pun.
