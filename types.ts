import { CourseColorMap } from './constants/coursePalettes';
export type CourseColor = keyof typeof CourseColorMap;

export type EventType = 'lecture' | 'lab' | 'seminar' | 'general'
export type DueType = 'date' | 'datetime'

export interface Event {
  id: number;
  type: EventType;
  start: Date;
  end: Date;
  course?: string;
  location?: string;
  notes?: string;
}

export interface Activity {
  id: number;
  title: string;
  course?: string;
  description?: string;
  due?: Date;
  dueType?: DueType;
  priority?: string;
  completedAt?: string;
}
export interface Exam {
  id: number
  name: string
  start: Date
  end: Date
  weight?: string
  location?: string
  grade?: string
  notes?: string
}

export interface Course {
  id: number;
  code: string;
  color: CourseColor;
  name?: string;
  instructor?: string;
  credits?: number;
}

export interface Semester {
  id: number;
  name: string;
  start: Date;
  end: Date;
}