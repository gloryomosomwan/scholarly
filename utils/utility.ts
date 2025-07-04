import { CourseColorMap } from "@/data/coursePalettes";
import { CourseColor } from "@/types";
import { useTheme } from "../hooks/useTheme";

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

export const getPriorityPalette = (priority?: string) => {
  const theme = useTheme()
  switch (priority?.toLowerCase()) {
    case 'high':
      return {
        color: theme.dangerText,
        backgroundColor: theme.dangerBackground,
        borderColor: theme.dangerBorder,
      };
    case 'medium':
      return {
        color: theme.warningText,
        backgroundColor: theme.warningBackground,
        borderColor: theme.warningBorder,
      };
    case 'low':
      return {
        color: theme.successText,
        backgroundColor: theme.successBackground,
        borderColor: theme.successBorder,
      };
    default:
      return {
        color: theme.text,
        backgroundColor: theme.grey100,
        borderColor: theme.grey200,
      };
  }
};