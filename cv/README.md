# CV Per Siswa

## Skema

Setiap siswa memiliki folder di `cv/<nama>/`. File entry adalah `cv/<nama>/index.php`.
URL akhir: `/cv/<nama>/` — Nginx me-resolve ke `index.php` via direktif `index`.

Folder `cv/` diletakkan di root repo (bukan `public/`) agar Vite tidak memproses `.php`.

## Cara Tambah CV Baru

1. Buat folder `cv/<nama>/`.
2. Tambahkan `index.php` di dalam folder (pakai `cv/template.php` sebagai referensi, atau standalone).
3. Letakkan aset (gambar, CSS, JS) relatif di dalam folder yang sama.
4. Tambahkan `cvSlug: "<nama>"` pada **setiap entri siswa** yang bersangkutan di `src/data/classData.ts`
   — semua grade (10, 11, 12) tempat nama muncul, termasuk sebagai officer.
5. Deploy ulang — `cv/` otomatis disinkronkan ke `$WEB_ROOT/cv/` oleh `scripts/deploy.sh`
   dan `scripts/refresh-feed.sh`.

## Syarat Server

- **PHP 7.4+** (dengan php-fpm). File `.php` harus diproses PHP, bukan disajikan statis.
- **Nginx**: lokasi `/cv/` me-resolve directory URL ke `index.php`, lalu file `.php`
  dijalankan via php-fpm. Contoh:

```nginx
server {
    listen 80;
    server_name example.com;

    # Static site utama
    root /var/www/pplg;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }

    # CV — directory URL /cv/<nama>/ resolve ke index.php
    location /cv/ {
        index index.php;
    }

    # CV PHP — semua file .php di cv/<nama>/ dijalankan via php-fpm
    location ~ ^/cv/.+\.php$ {
        fastcgi_pass unix:/run/php/php-fpm.sock;   # sesuaikan dengan lingkungan Anda
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

> Ganti path `php-fpm.sock` sesuai instalasi Anda (bisa `127.0.0.1:9000` atau path socket khas distro).
