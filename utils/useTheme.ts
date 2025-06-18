import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, lightPriorityColors, darkPriorityColors } from "./themes";

export function useTheme() {
  const scheme = useColorScheme() ?? 'light'
  const theme = scheme === 'light' ? lightTheme : darkTheme
  return theme;
}

export function usePriorityColors() {
  const scheme = useColorScheme() ?? 'light'
  const priorityColors = scheme === 'light' ? lightPriorityColors : darkPriorityColors
  return priorityColors
}
