<?php
/**
 * cv/template.php — Template CV statis (PHP).
 *
 * URL: /cv/<slug>.php  (atau /cv/template.php?slug=<slug>)
 * Membaca data dari cv/data/<slug>.json.
 *
 * Keamanan:
 *   - Slug divalidasi dengan regex [a-z0-9-] (cek lagi path traversal).
 *   - File data dibatasi di cv/data/ via realpath check.
 *   - Semua output di-escape dengan htmlspecialchars.
 *   - 404 jika slug invalid atau data tidak ditemukan.
 */

declare(strict_types=1);

// --- Baca & validasi slug ---
$slug = $_GET['slug'] ?? '';

if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
    http_response_code(404);
    echo renderNotFound();
    exit;
}

// --- Path data (terbatas di cv/data/, aman dari path traversal) ---
$dataDir = __DIR__ . '/data';
$dataFile = $dataDir . '/' . basename($slug) . '.json';

$realFile = realpath($dataFile);
$realDir = realpath($dataDir);

if ($realFile === false || $realDir === false
    || strpos($realFile, $realDir . DIRECTORY_SEPARATOR) !== 0
) {
    http_response_code(404);
    echo renderNotFound();
    exit;
}

// --- Baca JSON ---
$raw = @file_get_contents($realFile);
if ($raw === false) {
    http_response_code(500);
    echo renderError('Gagal membaca data.');
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(500);
    echo renderError('Data tidak valid.');
    exit;
}

// --- Helper ---
function e($s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function renderNotFound(): string {
    return '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8">'
         . '<title>404 — CV tidak ditemukan</title></head>'
         . '<body style="font-family:system-ui,sans-serif;max-width:640px;margin:2rem auto;padding:0 1rem;">'
         . '<h1>404 — CV tidak ditemukan</h1>'
         . '<p>Slug tidak valid atau data tidak tersedia.</p>'
         . '</body></html>';
}

function renderError(string $msg): string {
    return '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8">'
         . '<title>500 — Kesalahan</title></head>'
         . '<body style="font-family:system-ui,sans-serif;max-width:640px;margin:2rem auto;padding:0 1rem;">'
         . '<h1>500 — Kesalahan</h1>'
         . '<p>' . e($msg) . '</p>'
         . '</body></html>';
}

// --- Data opsional dengan fallback ---
$name      = $data['name'] ?? 'Tanpa Nama';
$summary   = $data['summary'] ?? '';
$education = $data['education'] ?? [];
$skills    = $data['skills'] ?? [];
$social    = $data['social'] ?? [];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CV — <?= e($name) ?></title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; color: #1f2937; line-height: 1.6; }
        h1 { font-size: 1.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: .5rem; margin-bottom: .5rem; }
        h2 { font-size: 1.25rem; margin-top: 1.5rem; color: #374151; }
        p, li { margin: .25rem 0; }
        ul { padding-left: 1.25rem; }
        .meta { color: #6b7280; font-size: .9rem; }
        .social a { color: #2563eb; text-decoration: none; margin-right: .75rem; }
        .social a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1><?= e($name) ?></h1>

    <?php if (!empty($summary)): ?>
    <p><?= e($summary) ?></p>
    <?php endif; ?>

    <?php if (!empty($social)): ?>
    <div class="social">
        <?php foreach ($social as $item): ?>
        <a href="<?= e($item['url'] ?? '') ?>"><?= e($item['label'] ?? '#') ?></a>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>

    <?php if (!empty($education)): ?>
    <h2>Pendidikan</h2>
    <ul>
        <?php foreach ($education as $edu): ?>
        <li>
            <strong><?= e($edu['institution'] ?? '') ?></strong>
            <?php if (!empty($edu['period'])): ?> — <span class="meta"><?= e($edu['period']) ?></span><?php endif; ?>
            <?php if (!empty($edu['major'])): ?> · <?= e($edu['major']) ?><?php endif; ?>
        </li>
        <?php endforeach; ?>
    </ul>
    <?php endif; ?>

    <?php if (!empty($skills)): ?>
    <h2>Keahlian</h2>
    <ul>
        <?php foreach ($skills as $skill): ?>
        <li><?= e($skill) ?></li>
        <?php endforeach; ?>
    </ul>
    <?php endif; ?>
</body>
</html>
