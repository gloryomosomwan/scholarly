import { useColorScheme } from "react-native";

import { light, dark } from "@/constants/themes";

export function useTheme() {
  const scheme = useColorScheme() ?? 'light'
  const theme = scheme === 'light' ? light : dark
  return theme;
}
