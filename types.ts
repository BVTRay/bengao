
export enum Page {
  LOGIN = 'LOGIN',
  CERTIFY = 'CERTIFY',
  PENDING = 'PENDING',
  REGISTER_INFO = 'REGISTER_INFO',
  MAIN = 'MAIN',
  // New Pages
  MY_CREATIONS = 'MY_CREATIONS', 
  MANAGE_CREATION = 'MANAGE_CREATION', 
  MY_POSTS = 'MY_POSTS', 
  NEWS_LIST = 'NEWS_LIST',
  COMPANY_LIST = 'COMPANY_LIST',
  GROUPS = 'GROUPS',
  ACTIVITIES = 'ACTIVITIES',
  ALUMNI_DETAIL = 'ALUMNI_DETAIL',
  POST_DETAIL = 'POST_DETAIL',
  ALUMNI_LIST = 'ALUMNI_LIST',
  PUBLISH_POST = 'PUBLISH_POST',
  ALUMNI_CARD = 'ALUMNI_CARD',
  NOTIFICATIONS = 'NOTIFICATIONS',
  MY_FAVORITES = 'MY_FAVORITES',
  SETTINGS = 'SETTINGS',
  VISITORS = 'VISITORS',
  MY_ALUMNI = 'MY_ALUMNI',
  EDIT_PROFILE = 'EDIT_PROFILE',
  // Deep Detail Pages
  SEARCH = 'SEARCH',
  ARTICLE_DETAIL = 'ARTICLE_DETAIL',
  ACTIVITY_DETAIL = 'ACTIVITY_DETAIL',
  COMPANY_DETAIL = 'COMPANY_DETAIL',
  GROUP_DETAIL = 'GROUP_DETAIL',
  // Forms
  ADD_COMPANY = 'ADD_COMPANY',
  CREATE_GROUP = 'CREATE_GROUP',
  PUBLISH_ACTIVITY = 'PUBLISH_ACTIVITY',
  // Admin Pages
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_AUDIT = 'ADMIN_AUDIT',
  ADMIN_USER_MANAGE = 'ADMIN_USER_MANAGE',
  ADMIN_PUBLISH_NEWS = 'ADMIN_PUBLISH_NEWS'
}

export enum Tab {
  HOME = 'HOME',
  SQUARE = 'SQUARE',
  MINE = 'MINE'
}

export interface UserProfile {
  name: string;
  year: string;
  classId: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  bio?: string;
  avatar?: string;
}

export interface Member {
  id: number;
  name: string;
  year: string;
  avatar: string;
  status: 'pending' | 'approved';
  date: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  founder: string;
  founderYear: string;
  logo: string; // fontawesome icon name suffix
  color: string; // tailwind color name
  creator?: string; 
  members?: Member[];
}

export interface Group {
  id: number;
  name: string;
  type: string; // 地区 | 兴趣 | 行业
  count: number;
  icon: string;
  color: string;
  desc?: string;
  creator?: string;
  members?: Member[];
}

export interface Activity {
  id: number;
  title: string;
  date: string;
  location: string;
  status: 'enrolling' | 'ended';
  image: string;
  creator?: string;
  members?: Member[]; 
}

export interface AuditItem {
  id: number;
  type: 'company' | 'group' | 'activity' | 'user';
  actionType: 'create' | 'update'; 
  targetId?: number; 
  applicant: string;
  date: string;
  data: any;
}
