import { CourseColorMap } from '../constants/coursePalettes';
export type CourseColor = keyof typeof CourseColorMap;

export type EventType = 'lecture' | 'lab' | 'seminar' | 'general'
export type DueType = 'date' | 'datetime'

export interface Event {
  id: number;
  type: EventType;
  start: Date;
  end: Date;
  name?: string;
  course?: string;
  location?: string;
  notes?: string;
}

export interface Test {
  id: number;
  start: Date;
  end: Date;
  name: string;
  course: string;
  location?: string;
  notes?: string;
  weight?: number;
  grade?: number
}

export interface Activity {
  id: number;
  title: string;
  course?: string;
  description?: string;
  due?: Date;
  dueType?: DueType;
  priority?: PriorityOption;
  completedAt?: string;
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

export type SortOption = 'Course' | 'Priority'
export type FilterOption = 'Course' | 'Priority'
export type PriorityOption = 'high' | 'medium' | 'low'

// export interface Task {
//   id: number;
//   title: string;
//   course?: string;
//   description?: string;
//   due?: Date;
//   dueType?: DueType;
//   priority?: string;
//   completedAt?: string;
// }

// export interface Assignment {
//   id: number;
//   title: string;
//   course: string;
//   description?: string;
//   due: Date;
//   dueType: DueType;
//   completedAt?: string;
//   weight?: number;
//   grade?: number;
// }