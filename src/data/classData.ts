import type {
  ClassConfig,
  NavItem,
  StatItem,
  FocusArea,
  ClassLeader,
  Division,
  ProjectShowcase,
  AchievementItem,
  ActivityDoc,
} from "./types";

export const classConfig: ClassConfig = {
  className: "PPLG 1",
  schoolName: "SMK Negeri 1 Leuwimunding",
  academicYear: "2025/2026",
  room: "Lab Rekayasa Perangkat Lunak 1",
  tagline:
    "Merancang Algoritma, Mengukir Kode, Menciptakan Masa Depan Digital.",
  homeroomTeacher: {
    name: "Drs. Hendra Wijaya, M.Kom.",
    nip: "19780512 200501 1 003",
    title: "Wali Kelas & Guru Pembimbing RPL",
    quote:
      "Kode yang bersih adalah refleksi pikiran yang terstruktur. Tetaplah bereksperimen dan jangan takut pada 'Error'.",
    subject: "Pemrograman Berorientasi Objek (PBO)",
  },
  socials: {
    instagram: "https://www.instagram.com/_xiirone1_/",
    github: "https://github.com/pplg1-class",
    discord: "https://discord.gg/pplg1-community",
  },
  contact: {
    email: "pplg1.smkn1@school.sch.id",
    location: "Gedung Baru",
    labName: "Lab RPL 1",
  },
};

export const navItems: NavItem[] = [
  { label: "Tentang", href: "#tentang" },
  { label: "Struktur", href: "#struktur" },

  { label: "Karya & Prestasi", href: "#karya" },
  { label: "Kegiatan", href: "#kegiatan" },
  { label: "Kontak", href: "#kontak" },
];

export const statsData: StatItem[] = [
  {
    value: "34",
    label: "Siswa Aktif",
    sublabel: "18 Web · 10 Mobile · 8 Game",
  },
  { value: "14+", label: "Proyek Selesai", sublabel: "Aplikasi, Game & IoT" },
  { value: "5", label: "Penghargaan", sublabel: "LKS & Hackathon Lokal" },
  {
    value: "100%",
    label: "Semangat Kolaborasi",
    sublabel: "Pembelajaran Berbasis Proyek",
  },
];

export const focusAreas: FocusArea[] = [
  {
    id: "web",
    title: "Pengembangan Web",
    iconName: "Code2",
    description:
      "Fokus pada arsitektur frontend modern, RESTful API, serta integrasi basis data relasional.",
    techs: ["Vue.js", "TypeScript", "Tailwind CSS", "Laravel", "PostgreSQL"],
  },
  {
    id: "mobile",
    title: "Aplikasi Mobile",
    iconName: "Smartphone",
    description:
      "Membangun aplikasi lintas platform dengan performa tinggi dan antarmuka pengguna yang intuitif.",
    techs: ["Flutter", "Dart", "Firebase", "REST API", "SQLite"],
  },
  {
    id: "game",
    title: "Pengembangan Gim",
    iconName: "Gamepad2",
    description:
      "Eksplorasi logika permainan 2D/3D, mekanik gim, desain aset pixel art, dan optimalisasi sistem.",
    techs: ["Unity", "C#", "Godot Engine", "Blender 3D", "Pixel Logic"],
  },
];

export const classLeaders: ClassLeader[] = [
  {
    role: "Ketua Kelas",
    name: "Muhammad Rizky Pratama",
    bio: "Bertanggung jawab atas koordinasi kegiatan kelas, penghubung wali kelas, dan mengoordinasikan kelompok belajar.",
    quote:
      "Teknologi bukan hanya soal alat, tapi soal cara kita menyelesaikan masalah bersama.",
    avatarSeed: "Rizky",
    focus: "Full-stack Developer",
  },
  {
    role: "Wakil Ketua Kelas",
    name: "Siti Nurhaliza",
    bio: "Mendampingi ketua kelas dalam manajemen internal dan mengawasi jadwal kedisiplinan serta inventaris lab.",
    quote:
      "Keteraturan adalah kunci utama kode yang mudah dirawat dan kelas yang kondusif.",
    avatarSeed: "Siti",
    focus: "UI/UX & Mobile Dev",
  },
  {
    role: "Sekretaris 1",
    name: "Ahmad Fauzi",
    bio: "Mengelola pendokumentasian presensi, notulensi rapat kelas, dan penyusunan berkas administrasi.",
    quote:
      "Catatan yang rapi menyelamatkan tim dari kebingungan saat tenggat waktu.",
    avatarSeed: "Fauzi",
    focus: "Backend Developer",
  },
  {
    role: "Sekretaris 2",
    name: "Anisa Rahmawati",
    bio: "Membantu pembuatan laporan kegiatan kelas dan dokumentasi acara publik/pameran karya.",
    quote: "Kreativitas dimulai dari pemahaman mendalam atas detail.",
    avatarSeed: "Anisa",
    focus: "Technical Writer",
  },
  {
    role: "Bendahara 1",
    name: "Budi Santoso",
    bio: "Mengelola anggaran kas kelas untuk kebutuhan alat praktikum tambahan, acara internal, dan dana sosial.",
    quote: "Transparansi dan ketelitian adalah fondasi kepercayaan.",
    avatarSeed: "Budi",
    focus: "Database Administrator",
  },
  {
    role: "Bendahara 2",
    name: "Dewi Lestari",
    bio: "Mencatat transaksi harian dan laporan keuangan bulanan yang diakses terbuka oleh seluruh siswa.",
    quote:
      "Keuangan yang terencana mendukung setiap ide projek berjalan lancar.",
    avatarSeed: "Dewi",
    focus: "Frontend Specialist",
  },
];

export const divisionsData: Division[] = [
  {
    id: "div-web",
    name: "Divisi Web & Cloud",
    code: "DIV-01",
    lead: "Fajar Ramadhan",
    membersCount: 18,
    description:
      "Fokus mendalami arsitektur web responsif, API terintegrasi, dan arsitektur server.",
    currentProject: "Sistem Informasi Perpustakaan Digital Sekolah",
    stack: ["Vue 3", "Node.js", "Express", "Tailwind CSS", "MySQL"],
  },
  {
    id: "div-mobile",
    name: "Divisi Mobile Apps",
    code: "DIV-02",
    lead: "Nabila Putri",
    membersCount: 10,
    description:
      "Mengkaji pembuatan aplikasi native dan hybrid dengan standar UX perangkat bergerak modern.",
    currentProject: "Aplikasi Presensi Mandiri Berbasis QR & GPS",
    stack: ["Flutter", "Dart", "Firebase", "State Management"],
  },
  {
    id: "div-game",
    name: "Divisi Game Development",
    code: "DIV-03",
    lead: "Kevin Adhitama",
    membersCount: 8,
    description:
      "Pengembangan gim edukasi 2D dan simulasi interaktif berbasis game engine modern.",
    currentProject: "Game Edukasi Sejarah Nusantara 'Langkah Pahlawan'",
    stack: ["Unity", "C#", "Aseprite", "Audacity"],
  },
];

export const showcaseProjects: ProjectShowcase[] = [
  {
    id: "proj-1",
    title: "SchoolVerse — Portal Edukasi Interaktif",
    category: "Web App",
    summary:
      "Platform e-learning terpadu dengan fitur materi video, kuis otomatis, dan papan peringkat siswa.",
    description:
      "Sistem dibangun menggunakan Vue 3 dan Tailwind CSS dengan backend Express. Dilengkapi modul analisis performa belajar harian.",
    author: "Tim Divisi Web (Fajar & Rizky)",
    division: "Web & Cloud",
    status: "Juara 1 LKS",
    statusType: "highlight",
    tags: ["Vue 3", "Node.js", "Tailwind CSS", "Chart.js"],
    repoUrl: "https://github.com/pplg1-class/schoolverse-app",
    demoUrl: "https://schoolverse-demo.example.com",
  },
  {
    id: "proj-2",
    title: "KantinPay — QRIS & Smart Canteen",
    category: "Mobile App",
    summary:
      "Aplikasi pemesanan makanan kantin sekolah tanpa antre dengan pembayaran dompet digital.",
    description:
      "Memungkinkan siswa memesan dari kelas dan mengambil makanan saat istirahat. Menghemat waktu antrean hingga 70%.",
    author: "Tim Divisi Mobile (Nabila & Siti)",
    division: "Mobile Apps",
    status: "Rilis v1.0",
    statusType: "success",
    tags: ["Flutter", "Firebase", "Payment Gateway"],
    repoUrl: "https://github.com/pplg1-class/kantin-pay",
    demoUrl: "https://kantinpay.example.com",
  },
  {
    id: "proj-3",
    title: "Langkah Pahlawan: Kisah Diponegoro",
    category: "Game Dev",
    summary:
      "Gim aksi petualangan 2D bergenre side-scroller dengan misi sejarah interaktif.",
    description:
      "Dibuat menggunakan Unity C# dengan aset sprite buatan sendiri. Dirancang untuk membantu pembelajaran sejarah di tingkat SMP/SMA.",
    author: "Tim Divisi Game (Kevin & Aulia)",
    division: "Game Development",
    status: "Tahap Beta",
    statusType: "warning",
    tags: ["Unity", "C#", "Pixel Art", "2D Platformer"],
    repoUrl: "https://github.com/pplg1-class/game-langkah-pahlawan",
    demoUrl: "https://pplg1-class.itch.io/langkah-pahlawan",
  },
  {
    id: "proj-4",
    title: "EcoSmart Lab Monitor",
    category: "IoT / System",
    summary:
      "Sistem pemantau suhu, kelembaban, dan penggunaan daya AC lab secara real-time.",
    description:
      "Dashboard berbasis web yang menerima data dari mikrokontroler ESP32 via protokol MQTT.",
    author: "Fauzi & Budi",
    division: "Web & Cloud",
    status: "Open Source",
    statusType: "success",
    tags: ["ESP32", "MQTT", "Websockets", "Vue.js"],
    repoUrl: "https://github.com/pplg1-class/ecosmart-lab",
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: "ach-1",
    year: "2025",
    title: "Juara 1 LKS Web Technologies Tingkat Kota",
    event: "Lomba Kompetensi Siswa (LKS) SMK 2025",
    rank: "Juara 1 Gold Medal",
    recipients: ["Muhammad Rizky Pratama"],
    category: "Web Development",
  },
  {
    id: "ach-2",
    year: "2025",
    title: "Juara 2 Hackathon Pelajar 'CodeForNation'",
    event: "National Youth Tech Competition 2025",
    rank: "Juara 2 Silver Medal",
    recipients: ["Fajar Ramadhan", "Nabila Putri", "Ahmad Fauzi"],
    category: "Innovation & App",
  },
  {
    id: "ach-3",
    year: "2024",
    title: "Juara Terbaik Kategori Game Edukasi",
    event: "Indie Game Developer Junior Festival",
    rank: "Best Educational Game Award",
    recipients: ["Kevin Adhitama", "Anisa Rahmawati"],
    category: "Game Design",
  },
];

export const activitiesData: ActivityDoc[] = [
  {
    id: "act-1",
    title: "Kunjungan Industri & Studio Tour Game",
    date: "14 November 2025",
    badge: "Kunjungan Industri",
    description:
      "Siswa PPLG 1 mendatangi studio pengembang gim ternama untuk belajar pipeline produksi gim komersial.",
    tags: ["Studi Lapangan", "Game Industry", "Networking"],
  },
  {
    id: "act-2",
    title: "Workshop Clean Code & Git Workflow",
    date: "28 Oktober 2025",
    badge: "Internal Workshop",
    description:
      "Sesi berbagi pengalaman dari alumni PPLG mengenai standar penulisan kode industri dan kolaborasi Git.",
    tags: ["Git", "Best Practices", "Peer Learning"],
  },
  {
    id: "act-3",
    title: "Class Tech Expo & Demonstration Day",
    date: "18 September 2025",
    badge: "Pameran Karya",
    description:
      "Pameran hasil karya projek semester ganjil yang dikunjungi oleh adik kelas dan bapak/ibu guru.",
    tags: ["Showcase", "Public Presentation", "Demo"],
  },
];
