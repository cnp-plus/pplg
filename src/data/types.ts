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

export interface ClassLeader {
  role: string;
  name: string;
  nisn?: string;
  bio: string;
  quote?: string;
  avatarSeed: string;
  focus: string;
}

export interface Division {
  id: string;
  name: string;
  code: string;
  lead: string;
  membersCount: number;
  description: string;
  currentProject: string;
  stack: string[];
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: 'Web App' | 'Game Dev' | 'Mobile App' | 'IoT / System';
  summary: string;
  description: string;
  author: string;
  division: string;
  status: 'Rilis v1.0' | 'Tahap Beta' | 'Juara 1 LKS' | 'Open Source';
  statusType: 'success' | 'highlight' | 'warning';
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
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
  homeroomTeacher: {
    name: string;
    nip: string;
    title: string;
    quote: string;
    subject: string;
  };
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
