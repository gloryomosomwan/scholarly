import dayjs from 'dayjs'

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

export const pretty = (data: any): void => {
  console.log(JSON.stringify(data, null, 2))
}

export function getTimeOfDay(): string {
  const now = dayjs()
  const midnight = now.startOf('day')
  const fourAM = midnight.add(4, 'hour')
  const noon = midnight.add(12, 'hour')
  const fivePM = midnight.add(17, 'hour')
  const ninePM = midnight.add(21, 'hour')
  if (now.isBetween(fourAM, noon, null, '[)')) return 'morning'
  else if (now.isBetween(noon, fivePM, null, '[)')) return 'afternoon'
  else if (now.isBetween(fivePM, ninePM, null, '[)')) return 'evening'
  else return 'night'
}