import { CourseColorMap } from '../constants/coursePalettes';
export type CourseColor = keyof typeof CourseColorMap;

export type EventType = 'lecture' | 'lab' | 'seminar' | 'general'
export type DueType = 'date' | 'datetime'
export type TaskSortOption = 'Course' | 'Priority'
export type TaskFilterOption = 'Course' | 'Priority'
export type PriorityOption = 'high' | 'medium' | 'low'
export type Frequency = 'once' | 'daily' | 'weekly' | 'monthly'
export type EventClass = 'regular' | 'multiday' | 'allday' | 'crossover'

export interface Event {
  id: number;
  name?: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  courseID?: number;
  location?: string;
  recurring?: string;
}

export interface Test {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  courseID: number;
  location?: string;
  notes?: string;
  weight?: number;
  grade?: number
}

// export interface Activity {
//   id: number;
//   title: string;
//   courseID?: number;
//   description?: string;
//   due?: Date;
//   dueType?: DueType;
//   priority?: PriorityOption;
//   completedAt?: string;
// }

export interface Task {
  id: number;
  title: string;
  courseID?: number;
  description?: string;
  due?: Date;
  dueType?: DueType;
  priority?: PriorityOption;
  completedAt?: string;
}

export interface Assignment {
  id: number;
  title: string;
  courseID: number;
  description?: string;
  due: Date;
  dueType: DueType;
  completedAt?: string;
  weight?: number;
  grade?: number;
}

export interface Course {
  id: number;
  code: string;
  color: string;
  name: string;
  semesterID: number
  instructor?: string;
}

export interface Semester {
  id: number;
  name: string;
  start: Date;
  end: Date;
}

