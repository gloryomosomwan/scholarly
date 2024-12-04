import { createContext } from 'react';

interface CurrentCourseContextType {
  currentCourse: string | null;
  setCurrentCourse: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CurrentCourseContext = createContext<CurrentCourseContextType | null>(null);