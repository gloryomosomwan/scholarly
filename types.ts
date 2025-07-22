import { CourseColorMap } from './constants/coursePalettes';
export type CourseColor = keyof typeof CourseColorMap;

export interface Event {
  id: number;
  type: string;
  course: string;
  start: Date;
  end: Date;
  location?: string;
  icon: string;
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
  title: string
  start: Date
  end: Date
  weight?: string
  location?: string
  grade?: string
  notes?: string
}

export interface Course {
  code: string;
  name?: string;
  instructor?: string;
  credits?: number;
  lectureSchedule?: string;
  labSchedule?: string;
  seminarSchedule?: string;
  location?: string;
  grade?: string;
  color: CourseColor;
}

export type DueType = 'date' | 'datetime'

export interface Semester {
  id: number;
  name: string;
  start: Date;
  end: Date;
}