import type {
  ClassConfig,
  NavItem,
  StatItem,
  FocusArea,
  AchievementItem,
  ActivityDoc,
  GradeStructure,
} from "./types";

export const classConfig: ClassConfig = {
  className: "PPLG 1",
  schoolName: "SMK Negeri 1 Leuwimunding",
  academicYear: "2025/2026",
  room: "Lab Rekayasa Perangkat Lunak 1",
  tagline:
    "Merancang Algoritma, Mengukir Kode, Menciptakan Masa Depan Digital.",
  socials: {
    instagram: "https://www.instagram.com/_xiirone1_/",
    github: "https://github.com/cnp-plus/pplg",
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
  { label: "Prestasi", href: "#prestasi" },
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
    title: "Pemrograman Web",
    iconName: "Code2",
    description:
      "Fokus pada pemahaman mendalam, serta integrasi basis data relasional.",
    techs: ["HTML", "CSS", "JavaScript", "PHP"],
  },
  {
    id: "mobile",
    title: "Pemrograman Perangkat Bergerak",
    iconName: "Smartphone",
    description:
      "Membangun aplikasi mobile dengan performa tinggi dan UI yang intuitif.",
    techs: ["Flutter", "Dart", "Kotlin"],
  },
  {
    id: "dbms",
    title: "Basis Data",
    iconName: "Data",
    description:
      "Mengintegrasikan aplikasi dengan data base, serta pemahaman CRUD yang mendalam.",
    techs: ["XAMPP", "MySQL", "MariaDB"],
  },
];

export const gradeStructures: GradeStructure[] = [
  // ── Kelas 10 ──
  {
    grade: 10,
    waliKelas: [
      {
        semester: 1,
        name: "Dra. Sri Mulyani, M.Pd.",
        subject: "Produktif RPL · Wali Kelas Sem 1",
      },
      {
        semester: 2,
        name: "Dra. Sri Mulyani, M.Pd.",
        subject: "Produktif RPL · Wali Kelas Sem 2",
      },
    ],
    officers: [
      {
        role: "Ketua Kelas",
        name: "Arif Setiawan",
        igUsername: "arif.setiawan_",
      },
      {
        role: "Wakil Ketua Kelas",
        name: "Putri Ayu Lestari",
        igUsername: "putri.ayu.l",
      },
    ],
    students: [
      { name: "Dimas Aditya Nugroho" },
      { name: "Rina Oktaviani" },
      { name: "Bima Satria Putra", igUsername: "bima.satria" },
      { name: "Nanda Pratama", igUsername: "nanda.pratama_" },
      { name: "Salsa Aulia Ramadhani", igUsername: "salsa.aulia" },
      { name: "Farhan Maulana" },
      { name: "Aulia Nur Hidayah", igUsername: "aulia.nh" },
      { name: "Reza Firmansyah" },
      { name: "Aditya Rizki Pratama", igUsername: "aditya.rp_" },
      { name: "Citra Dewi Anggraeni" },
      { name: "Ilham Hakim", igUsername: "ilham.hakim" },
      { name: "Mutiara Putri Sensa", igUsername: "mutiara.sensa" },
      { name: "Fajar Nugroho" },
      { name: "Lestari Wulandari", igUsername: "lestari.w" },
      { name: "Rizky Adi Saputra", igUsername: "rizky.adis" },
      { name: "Dwi Anisa Pramesti", igUsername: "dwianisa" },
      { name: "Yoga Pratama Putra" },
      { name: "Angga Firmansyah", igUsername: "angga.firm" },
      { name: "Sherly Octaviani", igUsername: "sherly.oct" },
      { name: "Bagas Permadi", igUsername: "bagas.permadi" },
      { name: "Nurul Hidayati", igUsername: "nurul.hidayati_" },
      { name: "Rafi Ahmad Fauzi", igUsername: "rafi.ahmadf" },
      { name: "Dian Kartika Sari" },
      { name: "Hendra Wijaya", igUsername: "hendra.wijaya_" },
      { name: "Mega Saputri" },
      { name: "Taufik Hidayat" },
      { name: "Anisa Maharani Putri", igUsername: "anisa.mhrn" },
      { name: "Gilang Ramadhan", igUsername: "gilang.rmd" },
      { name: "Winda Oktaviani Putri", igUsername: "winda.op" },
      { name: "Surya Adi Nugraha", igUsername: "surya.adi_" },
      { name: "Ratna Sari Dewi", igUsername: "ratna.sari" },
      { name: "Cahya Permata Sari", igUsername: "cahya.ps" },
    ],
  },

  // ── Kelas 11 ──
  {
    grade: 11,
    waliKelas: [
      {
        semester: 1,
        name: "Rudi Hartono, S.Kom.",
        subject: "Basis Data · Wali Kelas Sem 1",
      },
      {
        semester: 2,
        name: "Rudi Hartono, S.Kom.",
        subject: "Basis Data · Wali Kelas Sem 2",
      },
    ],
    officers: [
      { role: "Ketua Kelas", name: "Fajar Ramadhan", igUsername: "fajar.rmd" },
      {
        role: "Wakil Ketua Kelas",
        name: "Nabila Putri",
        igUsername: "nabila.putri_",
      },
    ],
    students: [
      { name: "Ahmad Fauzi", igUsername: "ahmad.fauzi" },
      { name: "Anisa Rahmawati" },
      { name: "Budi Santoso", igUsername: "budi.santoso_" },
      { name: "Dewi Lestari" },
      { name: "Muhammad Rizky Pratama", igUsername: "rizky.pratama_" },
      { name: "Siti Nurhaliza", igUsername: "siti.nurhaliza" },
      { name: "Kevin Adhitama", igUsername: "kevin.adhitama" },
      { name: "Aulia Rahma Sari" },
      { name: "Rizky Pratama Wijaya" },
      { name: "Nisa Azzahra Putri", igUsername: "nisa.azzahra" },
      { name: "Andi Prasetyo" },
      { name: "Maya Sari Dewi", igUsername: "maya.sari" },
      { name: "Bayu Firmansyah", igUsername: "bayu.firm" },
      { name: "Ratna Sari Amalia" },
      { name: "Dika Pratama Putra", igUsername: "dika.pratama" },
      { name: "Salsabila Nurul Aini", igUsername: "salsabila.na" },
      { name: "Yusuf Maulana" },
      { name: "Fitri Ayu Wulandari", igUsername: "fitri.ayu_" },
      { name: "Rafi Alfarizi" },
      { name: "Nadhira Aulia Putri", igUsername: "nadhira.ap" },
      { name: "Gilang Sena Pratama", igUsername: "gilang.sena" },
      { name: "Olivya Rahmawati" },
      { name: "Ilham Fauzi Alfian", igUsername: "ilham.fa" },
      { name: "Widya Sari Puspita", igUsername: "widya.sari" },
      { name: "Azis Fadhil Rahman" },
      { name: "Luthfi Hidayatulloh" },
      { name: "Cempaka Putri Kirana", igUsername: "cempaka.pk" },
      { name: "Reza Pratama Hideung" },
      { name: "Salma Azzahra", igUsername: "salma.azzahra_" },
      { name: "Angga Dwi Permana" },
      { name: "Ayu Lestari Wulan", igUsername: "ayu.lw" },
      { name: "Tegar Prasetyo", igUsername: "tegar.prasetyo" },
    ],
  },

  // ── Kelas 12 ──
  {
    grade: 12,
    waliKelas: [
      {
        semester: 1,
        name: "Drs. Hendra Wijaya, M.Kom.",
        subject: "PBO · Wali Kelas Sem 1",
      },
      {
        semester: 2,
        name: "Dewi Anggraini, S.Kom., M.T.",
        subject: "Matematika · Wali Kelas Sem 2",
      },
    ],
    officers: [
      {
        role: "Ketua Kelas",
        name: "Muhammad Rizky Pratama",
        igUsername: "rizky.pratama_",
      },
      {
        role: "Wakil Ketua Kelas",
        name: "Siti Nurhaliza",
        igUsername: "siti.nurhaliza",
      },
    ],
    students: [
      { name: "Ahmad Fauzi" },
      { name: "Anisa Rahmawati", igUsername: "anisa.rahmawati" },
      { name: "Budi Santoso" },
      { name: "Dewi Lestari", igUsername: "dewi.lestari" },
      { name: "Kevin Adhitama", igUsername: "kevin.adhitama" },
      { name: "Aulia Rahma Sari", igUsername: "aulia.rahma" },
      { name: "Fajar Nugroho" },
      { name: "Rizky Adi Saputra", igUsername: "rizky.adis" },
      { name: "Dwi Anisa Pramesti" },
      { name: "Nanda Pratama", igUsername: "nanda.pratama_" },
      { name: "Salsa Aulia Ramadhani", igUsername: "salsa.aulia" },
      { name: "Farhan Maulana" },
      { name: "Aulia Nur Hidayah", igUsername: "aulia.nh" },
      { name: "Reza Firmansyah", igUsername: "reza.firm" },
      { name: "Aditya Rizki Pratama", igUsername: "aditya.rp_" },
      { name: "Citra Dewi Anggraeni", igUsername: "citra.dewi" },
      { name: "Ilham Hakim" },
      { name: "Mutiara Putri Sensa" },
      { name: "Lestari Wulandari", igUsername: "lestari.w" },
      { name: "Yoga Pratama Putra", igUsername: "yoga.pratama" },
      { name: "Angga Firmansyah" },
      { name: "Sherly Octaviani", igUsername: "sherly.oct" },
      { name: "Bagas Permadi" },
      { name: "Nurul Hidayati", igUsername: "nurul.hidayati_" },
      { name: "Rafi Ahmad Fauzi" },
      { name: "Dian Kartika Sari", igUsername: "dian.kartika" },
      { name: "Hendra Wijaya", igUsername: "hendra.wijaya_" },
      { name: "Mega Saputri", igUsername: "mega.saputri" },
      { name: "Taufik Hidayat", igUsername: "taufik.hidayat" },
      { name: "Anisa Maharani Putri", igUsername: "anisa.mhrn" },
      { name: "Gilang Ramadhan", igUsername: "gilang.rmd" },
      { name: "Winda Oktaviani Putri" },
    ],
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
