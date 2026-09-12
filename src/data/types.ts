export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface FocusArea {
  id: string;
  title: string;
  iconName: string;
  description: string;
  techs: string[];
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  event: string;
  rank: string;
  recipients: string[];
  category: string;
}

export interface ActivityDoc {
  id: string
  title: string
  date: string
  badge: string
  description: string
  tags: string[]
}

export interface InstagramPost {
  id: string
  permalink: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption: string
  timestamp: string
  mediaUrl: string
}

export interface InstagramFeed {
  fetchedAt: string
  posts: InstagramPost[]
}

export interface ClassConfig {
  className: string;
  schoolName: string;
  academicYear: string;
  room: string;
  tagline: string;
  socials: {
    instagram: string;
    github: string;
    discord: string;
    youtube?: string;
  };
  contact: {
    email: string;
    location: string;
    labName: string;
  };
}

export interface SemesterTeacher {
  semester: 1 | 2;
  name: string;
  subject: string;
  avatarUrl?: string;
}

export interface Student {
  name: string;
  igUsername?: string;
  avatarUrl?: string;
  cvSlug?: string;
}

export interface OfficerStudent extends Student {
  role: 'Ketua Kelas' | 'Wakil Ketua Kelas';
}

export interface GradeStructure {
  grade: 10 | 11 | 12;
  waliKelas: [SemesterTeacher, SemesterTeacher];
  officers: [OfficerStudent, OfficerStudent];
  students: Student[];
}
