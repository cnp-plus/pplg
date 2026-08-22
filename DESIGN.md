# DESIGN.md — Sistem Desain Website Kelas PPLG 1

Dokumen ini mendokumentasikan arah visual dan aturan desain website kelas PPLG 1.
Revisi ini merupakan hasil redesign berpanduan skill **anti-ui-slop** (`new-work.md`) untuk
menghilangkan pola UI generik hasil AI ("AI-slop") dan menggantinya dengan desain yang
berangkat dari subjek: **kelas SMK jurusan rekayasa perangkat lunak & gim**.

---

## 1. Prinsip

1. **Struktur mengikuti tipe konten** — prestasi seperti buku catatan (ledger),
   pengurus seperti daftar susunan organisasi.
   Tipe konten yang berbeda harus tampak berbeda; tidak ada grid kartu seragam untuk semuanya.
2. **Tipografi memimpin, chrome minimal** — hierarki dibangun dari ukuran, bobot, dan ritme
   font, bukan dari kotak-berisi-border, pill badge, atau dekorasi.
3. **Satu momen editorial per section** — heading section dibagi dua kolom asimetris
   (judul kiri, narasi kanan), lalu konten mengalir dengan struktur masing-masing.
4. **Motion hanya menjelaskan state** — buka/tutup menu mobile, hover
   pada elemen yang benar-benar interaktif. Tidak ada animasi dekoratif scroll.
5. **Jujur secara fungsional** — situs statis tanpa backend: form kontak membuka aplikasi
   email (`mailto:`), tidak memalsukan "terkirim".
6. **Mode gelap yang koheren** — tema otomatis mengikuti sistem dengan palet yang
   menggunakan token yang sama, dipetakan ulang untuk kontras AA di latar gelap.

## 2. Keputusan Anti-Slop (apa yang dihapus & mengapa)

| Pola lama (slop) | Pengganti | Alasan |
| :--- | :--- | :--- |
| Grid kartu seragam 3 kolom untuk semua konten | List ledger / baris asimetris per tipe konten | Kartu seragam adalah klise AI paling umum; struktur harus menyampaikan makna |
| Glow blob blur (`blur-[120px]`) di hero | Latar putih bersih + tipografi besar | Dekorasi atmosfer generik tanpa hubungan dengan subjek |
| Headline gradient clip-text | Warna teks solid, satu frasa berwarna `primary-700` | Gradient text adalah penanda template AI |
| Terminal macOS dengan titik lampu traffic-light | Dihapus sepenuhnya | Kostum "koding" yang dipakaikan, bukan fungsi |
| Pill badge di hampir setiap data point | Maksimal satu indikator status kecil per item | Badge berlebihan meniadakan hierarki |
| Penomoran dekoratif (`// 01.`, eyebrow bernomor per section) | Dihapus total; heading section = `h2` murni | Nomor hanya boleh menyandikan urutan yang benar-benar ada — urutan scroll halaman bukan informasi yang perlu dilabeli |
| Tag palsu di statistik (`#total_capacity`) | Statistik polos: angka besar mono + label + sublabel | Noise teknis palsu |
| Navbar gelap + badge versi `v2026.1` + ornamen `</>` | Navbar putih sticky, brand monogram `P1` | Chrome harus tenang agar konten menonjol |
| Selang-seling section gelap/terang tanpa logika | Halaman terang konsisten (`white` ↔ `neutral-50`), footer gelap sebagai penutup | Kontras gelap-terang acak = dekorasi, bukan informasi |
| Panah hover pada baris non-link | Dihapus | Afilordansi palsu menyesatkan pengguna |

## 3. Token

### Warna

Sumber resmi: [`docs/color_palette.md`](docs/color_palette.md). Dipetakan sebagai token Tailwind v4
di `src/style.css` blok `@theme`. **Dilarang hardcode hex di komponen** — selalu pakai utility token:

| Token | Nilai | Peran utama di desain final |
| :--- | :--- | :--- |
| `primary-700` | `#2563EB` | Warna aksi & aksen utama (CTA, tab aktif, eyebrow) — mode terang |
| `primary-300` | `#93C5FD` | Aksen di atas latar gelap (footer, eyebrow gelap) — mode gelap |
| `primary-900` | `#1E3A8A` | Hover state CTA primer — mode terang |
| `primary-100` | `#DBEAFE` | Selection highlight — mode terang |
| `neutral-900` | `#111827` | Latar page gelap, teks terang; footer terang |
| `neutral-800` | Tailwind default | Latar kartu/surface gelap |
| `neutral-700` | `#374151` | Border gelap, divider |
| `neutral-400` | Tailwind default | Teks muted gelap, metadata |
| `neutral-300` | `#D1D5DB` | Teks body gelap, border terang |
| `neutral-100` | `#F3F4F6` | Teks utama gelap, hover gelap |
| `neutral-50` | `#F8FAFC` | Latar alternatif section terang |
| `accent-success/warning/error/highlight` | — | Indikator status saja (badge projek, titik aktif); jarang & kecil |

### Mode Gelap — Pemetaan Token

Mode gelap menggunakan kelas `.dark` pada `<html>` via `@custom-variant dark`. Palet dipetakan
menggunakan **utility token yang sudah ada** tanpa menambah hex baru:

| Elemen | Terang | Gelap |
| :--- | :--- | :--- |
| Latar page | `bg-white` / `bg-neutral-50` | `bg-white dark:bg-neutral-900` / `bg-neutral-50 dark:bg-neutral-800/40` |
| Latar kartu/surface | `bg-white` / `bg-neutral-50` | `dark:bg-neutral-800` |
| Border | `border-neutral-200` | `dark:border-neutral-700/50` atau `dark:border-neutral-700/60` |
| Teks utama | `text-neutral-900` | `dark:text-neutral-100` |
| Teks body | `text-neutral-700` / `text-neutral-600` | `dark:text-neutral-300` / `dark:text-neutral-400` |
| Teks muted | `text-neutral-500` | `dark:text-neutral-400` |
| Eyebrow / aksen | `text-primary-700` | `dark:text-primary-300` |
| CTA primer | `bg-primary-700` hover `bg-primary-900` | `dark:bg-primary-600` hover `dark:bg-primary-500` |
| Footer | `bg-neutral-900` (gelap permanen) | `bg-neutral-900` + `border-t border-neutral-700` untuk pemisah visual |
| Status badge | `text-accent-*` dengan opacity | `dark:text-accent-*` (tetap; kontras sudah memadai) |
| Selection | `bg-primary-100 text-primary-900` | `dark:bg-primary-800 dark:text-primary-100` |

### Tipografi

| Peran | Font | Catatan |
| :--- | :--- | :--- |
| Display & body | Plus Jakarta Sans (fallback Inter) | Heading extrabold `tracking-tight`; body regular |
| Data & label teknis | Fira Code | Eyebrow section, kode mapel, label meta uppercase `tracking-widest` |

Kontras sans ↔ mono adalah identitas tipografis halaman: **sans untuk manusia, mono untuk mesin/data**.
Dimuat via Google Fonts `display=swap` di `index.html`.

### Layout

- Kontainer: `max-w-6xl mx-auto px-6 sm:px-8` (lebih sempit dari default 7xl → kolom teks nyaman).
- Section: `py-20 lg:py-28`, dipisah `border-b border-neutral-200 dark:border-neutral-700/50`.
- Heading section: grid 12 kolom — judul `col-span-5`, narasi `col-span-7`.
- Radius kecil & konsisten: `rounded` / `rounded-lg` (bukan bulat besar `rounded-2xl/xl`).

## 4. Anatomi Section

Heading section tanpa eyebrow/label bernomor — hanya `h2` besar (opsional disertai narasi
satu paragraf di kolom kanan). Penomoran dekoratif dianggap pola slop dan tidak dipakai:

1. **Hero** — tipografi editorial murni: konteks sekolah → headline 3 skala → subjudul →
   dua CTA (primer `primary-700`, sekunder netral) → strip metrik 4 kolom di atas garis pemisah.
2. **Profil** — dua blok asimetris (identitas kelas + kutipan tagline; tiga pilar keahlian
   sebagai baris list, bukan kartu ikon).
3. **Struktur** — tab switcher tiga kelas (10, 11, 12; default kelas 12) dengan panel
   per kelas: dua kartu wali kelas per semester (avatar inisial + nama + mata pelajaran),
  lalu grid roster 34 kartu (2 officer — ketua & wakil — dengan label mono role di atas nama,
  + 32 siswa). Avatar inisial + nama + tautan IG opsional. Tanpa divisi terpisah.
4. **Prestasi** — ledger daftar pencapaian kompetisi: tahun–judul–peringkat–pihak;
   tanpa showcase projek. Section id `#prestasi`.
5. **Kegiatan** — grid responsif postingan Instagram (2 kolom mobile, 3 kolom desktop).
   Setiap tile: gambar `aspect-square` + tanggal mono + cuplikan caption 2 baris.
   Tautan ke postingan asli via Instagram permalink. Indikator tipe media (ikon Play/Copy)
   hanya muncul pada postingan VIDEO/CAROUSEL. Fallback: timeline editorial yang sama
   jika `instagram.json` kosong atau belum di-generate.
6. **Footer** — satu-satunya permukaan gelap (`neutral-900`): branding `P1`, kontak,
   sosmed, form pesan (mailto), copyright. Di mode gelap dipisahkan dari page dengan border-top.

## 5. Tema: Otomatis Mengikuti Sistem

### Perilaku

- **Tanpa kontrol pengguna** — tidak ada toggle di UI. Tema sepenuhnya mengikuti
  preferensi sistem pengunjung via `prefers-color-scheme`.
- **FOUC prevention**: skrip inline di `<head>` (`index.html`) menerapkan kelas `.dark`
  pada `<html>` sebelum paint pertama, dan memasang listener `matchMedia` agar perubahan
  preferensi OS mengikuti secara real-time tanpa reload.
- **Tailwind v4**: Dark mode dikonfigurasi via `@custom-variant dark (&:where(.dark, .dark *));`
  di `src/style.css`. Semua komponen menggunakan prefix `dark:` untuk override.

### Konsekuensi desain

- Kedua mode harus selalu sama kuat: setiap permukaan, teks, border, dan aset wajib punya
  pasangan `dark:` yang teruji — tidak ada asumsi "default terang".
- Tidak ada state tema di `localStorage`; satu-satunya sumber kebenaran adalah OS.
- Uji wajib sebelum commit: lihat situs dalam kedua mode (aturan §8).

## 6. Interaksi & Motion

### Sistem: anime.js v4

Motion site-wide menggunakan **anime.js v4** (`npm install animejs`). API yang dipakai:
`import { animate, stagger } from "animejs"`. Helper reveal-on-scroll ada di
`src/composables/useReveal.ts`.

### Aturan Motion

| Prinsip | Detail |
| :--- | :--- |
| **Motion menjelaskan state** | Entrance reveals konten saat masuk viewport; tab switch re-stagger roster. Tidak ada animasi dekoratif. |
| **Durasi pendek** | Entrance: 300–500 ms. Stagger offset: 25–60 ms. Tab re-reveal: 25 ms/card, cap ~400 ms total. |
| **Properti yang dianimasikan** | `opacity` (0→1) + `translateY` (12–20px → 0) SAJA. Tidak ada scale, bounce, spring, parallax, atau loop. |
| **Easing** | `outCubic` untuk semua entrance. Tidak ada easing eksotis. |
| **`prefers-reduced-motion`** | Jika `reduce`, SEMUA JS animation di-skip — elemen render final state langsung. Smooth-scroll CSS tetap dimatikan (`style.css`). Elemen tidak pernah tersembunyi permanen jika JS atau IO gagal. |
| **Hover/focus/menu** | Tetap CSS transition — anime.js TIDAK menangani micro-interaction. |
| **Navbar** | Statis — tidak ada entrance animation. |

### Timing Map

| Section | Trigger | Targets | Duration | Stagger | Catatan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero** | On mount (once) | `[data-hero-reveal]` blocks (5) | 500 ms | 60 ms | Context → Headline → Subtitle → CTA → Metrics. Stats count-up 800 ms setelah entrance selesai. |
| **Tentang** | Scroll IO | `[data-reveal]` (heading + 2 content blocks) | 400 ms | 60 ms | IO rootMargin `-10%`. Unobserve setelah trigger. |
| **Struktur** | Scroll IO (initial) + tab switch | `[data-reveal]` (section header + wali kelas) + `[data-tab-reveal]` (roster tiles) | 400 ms (IO) / 300 ms (tab) | 30 ms (IO) / 25 ms (tab) | Tab switch re-stagger wali kelas + seluruh roster via `reRevealGrid()`. |
| **Prestasi** | Scroll IO | `[data-reveal]` (header + achievement rows) | 400 ms | 80 ms | IO rootMargin `-10%`. |
| **Kegiatan** | Scroll IO | `[data-reveal]` (header + IG tiles/activity rows) | 400 ms | 60 ms | IG grid tiles staggered. Fallback timeline juga staggered. |

### Progressive Enhancement & Reduced-Motion

1. Elemen terlihat normal tanpa JS (tidak ada `opacity: 0` di template/CSS).
2. `onMounted`: jika JS aktif DAN `prefersReducedMotion === false`, elemen di-hide
   synchronously via `hideNow()`, lalu di-reveal oleh anime.js (langsung atau via IO).
3. Jika `prefersReducedMotion === true`: `hideNow()` dan `revealNow()` no-op —
   elemen tetap terlihat penuh dari awal.
4. Jika IO gagal: elemen tetap tersembunyi (acceptible — kasus edge: browser sangat tua).
   Komponen melakukan `io?.disconnect()` di `onUnmounted`.

### Stat Count-Up

Angka di hero metrics (34, 14+, 5, 100%) dianimasikan dari 0 menggunakan helper
`countUp()` (requestAnimationFrame, outCubic). Suffix (+, %) dipertahankan.
Jika value bukan angka murni, dibiarkan statis.

## 7. Aksesibilitas (batas minimum)

- Landmark semantik: `header`/`nav`/`main`/`section` ber-`id`/`footer`.
- Menu mobile: `aria-expanded`, `aria-controls`, label jelas; semua kontrol fokus-visible
  (`focus:ring-2 focus:ring-primary-700`).
- Toggle tema: `aria-label`, `title`, keyboard accessible, focus ring.
- Kontras AA: teks abu netral ≥ `neutral-500` hanya untuk metadata kecil; body text
  `neutral-600/700` (terang) / `neutral-300/400` (gelap); teks di footer ≥ `neutral-400`.
- Form: label eksplisit, atribut `required`.

## 8. Aturan Konten

- **Semua konten hidup di `src/data/classData.ts`** (bertipe lewat `src/data/types.ts`).
  Komponen hanya merender; mengganti nama/prestasi tidak boleh menyentuh komponen.
- **`gradeStructures`** berisi data placeholder fiktif untuk tiga angkatan. Setiap entry
  mencakup wali kelas per semester (dengan mata pelajaran), dua pengurus (ketua & wakil),
  dan daftar siswa (32 per angkatan; total roster 34 termasuk ketua & wakil).
  Pasangan ketua & wakil menempati baris pertama di tengah (kolom tengah pada ≥md),
  sisanya baris penuh @4 kolom.
  Data ini diedit manual — bukan hasil pipeline.
- **`src/data/instagram.json` dan `public/ig/*` dihasilkan oleh skrip** (`npm run fetch:instagram`).
  Jangan mengedit file ini secara manual — placeholder SVG di `public/ig/` akan diganti
  dengan foto JPG yang diunduh saat pipeline pertama kali dijalankan.
- Nama orang, sekolah, tautan repo/demo, dan sosmed saat ini adalah placeholder fiktif.
- Copy berbahasa Indonesia, kalimat aktif, spesifik > pintar; label teknis mono
  (eyebrow, kode mapel) boleh ringkas/uppercase.

## 9. Do / Don't bagi kontributor

**Do**
- Tambah struktur baru yang bentuknya mengikuti jenis datanya.
- Pakai token warna & pasangan font yang sudah ada.
- Pakai ikon brand (Instagram/GitHub) dari `src/components/icons/social.ts` —
  ikon brand di lucide-vue-next deprecated dan bisa hilang di versi berikutnya.
- Uji build (`npm run build`) dan lihat hasil di mobile sebelum commit.
- Uji kedua tema (terang & gelap) sebelum push.

**Don't**
- Jangan menambah glow blob, gradient text, pill badge berlebih, grid kartu seragam baru,
  ikon dekoratif, atau animasi tanpa fungsi.
- Jangan hardcode hex/konten di komponen.
- Jangan menambah hex baru ke `@theme` untuk mode gelap — gunakan utility token yang ada.
- Jangan memalsukan perilaku (mis. "pesan terkirim" tanpa backend).
