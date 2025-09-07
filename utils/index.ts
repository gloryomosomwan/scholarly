import { CourseColorMap } from "@/constants/coursePalettes";
import { CourseColor } from "@/types";

export function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getCoursePalette = (color: CourseColor) => {
  return CourseColorMap[color]
}

export const pretty = (data: any): string => {
  return JSON.stringify(data, null, 2)
}