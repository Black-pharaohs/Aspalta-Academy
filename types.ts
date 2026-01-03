export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  LIVE_CLASS = 'LIVE_CLASS',
  COURSES = 'COURSES',
  AI_TUTOR = 'AI_TUTOR',
  TEACHERS = 'TEACHERS',
  MESSAGES = 'MESSAGES',
  RESOURCES = 'RESOURCES'
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  avatarUrl: string;
  email?: string;
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
  role: 'user' | 'model' | 'teacher';
  text: string;
  timestamp: Date;
}

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  bio: string;
  hourlyRate: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'PDF' | 'VIDEO' | 'DOC';
  size: string;
  date: string;
  author: string;
}