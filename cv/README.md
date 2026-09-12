# CV Per Siswa

## Arsitektur

- `cv/template.php` — template PHP tunggal, membaca data JSON berdasarkan `slug` dari `$_GET['slug']`.
- `cv/data/<slug>.json` — data tiap siswa dalam JSON (nama, ringkasan, pendidikan, keahlian, sosial).
- `cv/<slug>.php` — file tipis: mengatur `$_GET['slug']` lalu `require`-kan `template.php`,
  sehingga URL `/cv/<slug>.php` langsung jalan tanpa konfigurasi routing tambahan.

Folder `cv/` diletakkan di root repo (bukan `public/`) agar Vite tidak memproses `.php`.

## Cara Tambah CV Baru

1. Buat `cv/data/<slug>.json` dengan field `name`, `summary`, `education`, `skills`, `social`.
2. Buat `cv/<slug>.php` tipis:
   ```php
   <?php $_GET['slug'] = '<slug>'; require __DIR__ . '/template.php';
   ```
3. Tambahkan `cvSlug: "<slug>"` pada entri siswa yang bersangkutan di `src/data/classData.ts`.
4. Deploy ulang — `cv/` otomatis disinkronkan ke `$WEB_ROOT/cv/` oleh `scripts/deploy.sh`
   dan `scripts/refresh-feed.sh`.

## Syarat Server

- **PHP 7.4+** (dengan atau tanpa php-fpm; file `.php` harus diproses PHP, bukan disajikan statis).
- **Nginx**: pastikan lokasi `/cv/` melayani `.php` via php-fpm. Contoh konfigurasi server block:

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/pplg;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # CV PHP — file .php di proses via php-fpm
    location ~ ^/cv/.+\.php$ {
        fastcgi_pass unix:/run/php/php-fpm.sock;   # sesuaikan dengan lingkungan Anda
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Jangan biarkan JSON raw di cv/data/ diakses publik
    location ~ ^/cv/data/ {
        deny all;
        return 404;
    }
}
```

> Ganti path `php-fpm.sock` sesuai instalasi Anda (bisa `127.0.0.1:9000` atau path socket khas distro).
