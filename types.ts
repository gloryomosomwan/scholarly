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