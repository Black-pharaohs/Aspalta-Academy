export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  LIVE_CLASS = 'LIVE_CLASS',
  COURSES = 'COURSES',
  AI_TUTOR = 'AI_TUTOR'
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  avatarUrl: string;
}

export interface Course {
  id: string;
  title: string;
  progress: number; // 0 to 100
  nextSession: string;
  thumbnail: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}