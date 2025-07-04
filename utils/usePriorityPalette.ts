import { useTheme } from "./useTheme";

export function usePriorityPalette(priority?: string | null) {
  const theme = useTheme();
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
}