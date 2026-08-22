# Color Palette Guidelines

Dokumen ini berisi panduan dan referensi palet warna lengkap beserta kode hex dan shade untuk pengembangan desain UI/UX dan konsistensi styling aplikasi/website.

---

## 1. Primary Colors

Warna utama yang digunakan sebagai identitas visual, tombol utama, tautan, dan elemen fokus.

| Shade | Kode Hex | Visual Preview |
| :---: | :---: | :--- |
| **900** | `#1E3A8A` | <span style="background-color:#1E3A8A; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Dark Blue |
| **700** | `#2563EB` | <span style="background-color:#2563EB; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Medium Blue |
| **500** | `#3B82F6` | <span style="background-color:#3B82F6; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Standard Blue |
| **300** | `#93C5FD` | <span style="background-color:#93C5FD; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Light Blue |
| **100** | `#DBEAFE` | <span style="background-color:#DBEAFE; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Very Light Blue |

---

## 2. Secondary Colors

Warna sekunder digunakan untuk latar belakang kartu, tombol sekunder, komponen pendukung, dan elemen netral yang tidak mencolok.

| Shade | Kode Hex | Visual Preview |
| :---: | :---: | :--- |
| **900** | `#D1D5DB` | <span style="background-color:#D1D5DB; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Light Slate Gray |
| **700** | `#E5E7EB` | <span style="background-color:#E5E7EB; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Soft Gray |
| **500** | `#F3F4F6` | <span style="background-color:#F3F4F6; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Off-White Gray |
| **300** | `#F8FAFC` | <span style="background-color:#F8FAFC; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> Subtle Tint Gray |

---

## 3. Accent Colors

Warna aksen yang digunakan untuk indikator status, pemberitahuan, validasi form, dan *highlight*.

| Kategori | Kode Hex | Visual Preview | Deskripsi |
| :--- | :---: | :--- | :--- |
| **Warning** | `#F59E0B` | <span style="background-color:#F59E0B; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Peringatan, perhatian, status pending |
| **Error** | `#EF4444` | <span style="background-color:#EF4444; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Kesalahan, tindakan berbahaya/hapus |
| **Success** | `#10B981` | <span style="background-color:#10B981; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Berhasil, dikonfirmasi, aktif |
| **Highlight** | `#8B5CF6` | <span style="background-color:#8B5CF6; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Penekanan fitur khusus, promosi, badge |

---

## 4. Neutral Colors

Warna netral untuk teks, garis batas (border), pembatas (divider), dan latar belakang utama.

| Shade | Kode Hex | Visual Preview | Penggunaan Utama |
| :---: | :---: | :--- | :--- |
| **900** | `#111827` | <span style="background-color:#111827; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Teks utama, judul (Headings) |
| **700** | `#374151` | <span style="background-color:#374151; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Teks sekunder, label input |
| **500** | `#6B7280` | <span style="background-color:#6B7280; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Placeholder, teks non-aktif (disabled) |
| **300** | `#D1D5DB` | <span style="background-color:#D1D5DB; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Garis batas (Borders), divider |
| **100** | `#F3F4F6` | <span style="background-color:#F3F4F6; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Latar belakang komponen |
| **50** | `#F8FAFC` | <span style="background-color:#F8FAFC; display:inline-block; width:24px; height:24px; border-radius:4px; border:1px solid #ccc;"></span> | Latar belakang halaman (Background) |

---

## 5. Gradients

Gradien warna untuk latar belakang hero section, banner, atau tombol interaktif.

| Tipe Gradien | Warna Awal (From) | Warna Akhir (To) | Kode CSS |
| :--- | :---: | :---: | :--- |
| **Primary Light** | `#3B82F6` | `#93C5FD` | `background: linear-gradient(90deg, #3B82F6 0%, #93C5FD 100%);` |
| **Primary Vibrant** | `#2563EB` | `#93C5FD` | `background: linear-gradient(90deg, #2563EB 0%, #93C5FD 100%);` |
| **Primary Accent** | `#3B82F6` | `#8B5CF6` | `background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);` |

---

## 6. Konfigurasi Tailwind CSS (Opsional)

Jika menggunakan **Tailwind CSS**, Anda dapat menambahkan konfigurasi palet warna di atas ke dalam file `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#DBEAFE',
          300: '#93C5FD',
          500: '#3B82F6',
          700: '#2563EB',
          900: '#1E3A8A',
        },
        secondary: {
          300: '#F8FAFC',
          500: '#F3F4F6',
          700: '#E5E7EB',
          900: '#D1D5DB',
        },
        accent: {
          warning: '#F59E0B',
          error: '#EF4444',
          success: '#10B981',
          highlight: '#8B5CF6',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F3F4F6',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
          900: '#111827',
        },
      },
    },
  },
}
```
