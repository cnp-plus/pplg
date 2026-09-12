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
        name: "Siti Fathona, S.Pd.",
        subject: "Bahasa Inggris · Wali Kelas Sem 1",
      },
      {
        semester: 2,
        name: "Hamidin, S.T",
        subject: "Produktif RPL/TKJ · Wali Kelas Sem 2",
      },
    ],
    officers: [
      {
        role: "Ketua Kelas",
        name: "Ahmad Yusuf Firdaus",
        igUsername: "_ahmd.ysf_",
      },
      {
        role: "Wakil Ketua Kelas",
        name: "Yesi Anggita",
        igUsername: "username.example",
      },
    ],
    students: [
      { name: "Alsyah", igUsername: "username.example" },
      { name: "Alya Nur Fauziah", igUsername: "username.example" },
      { name: "Azzahra Meita Putri", igUsername: "username.example" },
      { name: "Dendi Soemantri", igUsername: "username.example" },
      { name: "Desy Apriyani", igUsername: "username.example" },
      { name: "Dinia Saroh", igUsername: "username.example" },
      { name: "Dwi Rafi Mazdudin", igUsername: "username.example" },
      { name: "Farida Amelia Sholiha", igUsername: "username.example" },
      { name: "Fedly Pratama", igUsername: "username.example" },
      { name: "Frysa Salsabila Fauzi", igUsername: "username.example" },
      { name: "Hasan", igUsername: "username.example" },
      { name: "Ilham Makhrus Salam", igUsername: "username.example" },
      { name: "Krisna Apriyono", igUsername: "username.example" },
      { name: "Lulu Isnawati", igUsername: "username.example" },
      { name: "Mita Oktaviani", igUsername: "username.example" },
      { name: "Mitha Salsabila", igUsername: "username.example" },
      { name: "Muhamad Saiful Anwar", igUsername: "username.example" },
      { name: "Muhammad Lutpi", igUsername: "username.example" },
      { name: "Muhammad Rifan Nur Hidayah", igUsername: "username.example" },
      { name: "Nihayatul Karimah", igUsername: "username.example" },
      { name: "Noval Fazri", igUsername: "username.example" },
      { name: "Nurmala Ayu Komalasari", igUsername: "username.example" },
      { name: "Retno Ayu Anjani", igUsername: "username.example" },
      { name: "Reva Alviani", igUsername: "username.example" },
      { name: "Ridho Firmansyah", igUsername: "username.example" },
      { name: "Rido Maulana", igUsername: "username.example" },
      { name: "Sahla Tri Nurrani", igUsername: "username.example" },
      { name: "Sartono Tegar Priyatna", igUsername: "username.example" },
      { name: "Shinta Ramadhani", igUsername: "username.example" },
      { name: "Vebyola Oktaviani", igUsername: "username.example" },
      { name: "Wildan Aziz Mubakkir", igUsername: "username.example" },
      { name: "Zazkya Fadillah", igUsername: "username.example" },
      { name: "Sultan Aziz Mugiroh", igUsername: "username.example" },
      { name: "Irpan Maulana", igUsername: "username.example" },
    ],
  },

  // ── Kelas 11 ──
  {
    grade: 11,
    waliKelas: [
      {
        semester: 1,
        name: "Usman, S.Pd.I.",
        subject: "Pendidikan Agama Islam & Budi Pekerti · Wali Kelas Sem 1",
      },
      {
        semester: 2,
        name: "Gun Gun Guntoro, S.Pd., Gr.",
        subject: "Pendidikan Pancasila · Wali Kelas Sem 2",
      },
    ],
    officers: [
      {
        role: "Ketua Kelas",
        name: "Fedly Pratama",
        igUsername: "username.example",
      },
      {
        role: "Wakil Ketua Kelas",
        name: "Muhammad Lutpi",
        igUsername: "username.example",
      },
    ],
    students: [
      { name: "Ahmad Yusuf Firdaus", igUsername: "_ahmd.ysf_" },
      { name: "Alsyah", igUsername: "username.example" },
      { name: "Alya Nur Fauziah", igUsername: "username.example" },
      { name: "Azzahra Meita Putri", igUsername: "username.example" },
      { name: "Dendi Soemantri", igUsername: "username.example" },
      { name: "Desy Apriyani", igUsername: "username.example" },
      { name: "Dinia Saroh", igUsername: "username.example" },
      { name: "Dwi Rafi Mazdudin", igUsername: "username.example" },
      { name: "Farida Amelia Sholiha", igUsername: "username.example" },
      { name: "Frysa Salsabila Fauzi", igUsername: "username.example" },
      { name: "Hasan", igUsername: "username.example" },
      { name: "Ilham Makhrus Salam", igUsername: "username.example" },
      { name: "Krisna Apriyono", igUsername: "username.example" },
      { name: "Lulu Isnawati", igUsername: "username.example" },
      { name: "Mita Oktaviani", igUsername: "username.example" },
      { name: "Mitha Salsabila", igUsername: "username.example" },
      { name: "Muhamad Saiful Anwar", igUsername: "username.example" },
      { name: "Muhammad Rifan Nur Hidayah", igUsername: "username.example" },
      { name: "Nihayatul Karimah", igUsername: "username.example" },
      { name: "Noval Fazri", igUsername: "username.example" },
      { name: "Nurmala Ayu Komalasari", igUsername: "username.example" },
      { name: "Retno Ayu Anjani", igUsername: "username.example" },
      { name: "Reva Alviani", igUsername: "username.example" },
      { name: "Ridho Firmansyah", igUsername: "username.example" },
      { name: "Rido Maulana", igUsername: "username.example" },
      { name: "Sahla Tri Nurrani", igUsername: "username.example" },
      { name: "Sartono Tegar Priyatna", igUsername: "username.example" },
      { name: "Shinta Ramadhani", igUsername: "username.example" },
      { name: "Vebyola Oktaviani", igUsername: "username.example" },
      { name: "Wildan Aziz Mubakkir", igUsername: "username.example" },
      { name: "Yesi Anggita", igUsername: "username.example" },
      { name: "Zazkya Fadillah", igUsername: "username.example" },
    ],
  },

  // ── Kelas 12 ──
  {
    grade: 12,
    waliKelas: [
      {
        semester: 1,
        name: "Vinny Widya Oktaviani, S.Psi.",
        subject: "Bimbingan Konseling (BK) · Wali Kelas Sem 1",
      },
      {
        semester: 2,
        name: "Coming Soon",
        subject: "Coming Soon",
      },
    ],
    officers: [
      {
        role: "Ketua Kelas",
        name: "Dwi Rafi Mazdudin",
        igUsername: "username.example",
        cvSlug: "contoh-ketua-kelas",
      },
      {
        role: "Wakil Ketua Kelas",
        name: "Fedly Pratama",
        igUsername: "username.example",
      },
    ],
    students: [
      { name: "Ahmad Yusuf Firdaus", igUsername: "_ahmd.ysf_", cvSlug: "contoh-siswa-satu" },
      { name: "Alsyah", igUsername: "username.example" },
      { name: "Alya Nur Fauziah", igUsername: "username.example" },
      { name: "Azzahra Meita Putri", igUsername: "username.example" },
      { name: "Dendi Soemantri", igUsername: "username.example" },
      { name: "Desy Apriyani", igUsername: "username.example" },
      { name: "Dinia Saroh", igUsername: "username.example" },
      { name: "Farida Amelia Sholiha", igUsername: "username.example" },
      { name: "Frysa Salsabila Fauzi", igUsername: "username.example" },
      { name: "Hasan", igUsername: "username.example" },
      { name: "Ilham Makhrus Salam", igUsername: "username.example" },
      { name: "Krisna Apriyono", igUsername: "username.example" },
      { name: "Lulu Isnawati", igUsername: "username.example" },
      { name: "Mita Oktaviani", igUsername: "username.example" },
      { name: "Mitha Salsabila", igUsername: "username.example" },
      { name: "Muhamad Saiful Anwar", igUsername: "username.example" },
      { name: "Muhamad Lutpi", igUsername: "username.example" },
      { name: "Muhammad Rifan Nur Hidayah", igUsername: "username.example" },
      { name: "Nihayatul Karimah", igUsername: "username.example" },
      { name: "Noval Fazri", igUsername: "username.example" },
      { name: "Nurmala Ayu Komalasari", igUsername: "username.example" },
      { name: "Retno Ayu Anjani", igUsername: "username.example" },
      { name: "Reva Alviani", igUsername: "username.example" },
      { name: "Ridho Firmansyah", igUsername: "username.example" },
      { name: "Rido Maulana", igUsername: "username.example" },
      { name: "Sahla Tri Nurrani", igUsername: "username.example" },
      { name: "Sartono Tegar Priyatna", igUsername: "username.example" },
      { name: "Shinta Ramadhani", igUsername: "username.example" },
      { name: "Vebyola Oktaviani", igUsername: "username.example" },
      { name: "Wildan Aziz Mubakkir", igUsername: "username.example" },
      { name: "Yesi Anggita", igUsername: "username.example" },
      { name: "Zazkya Fadillah", igUsername: "username.example" },
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
