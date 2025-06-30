import { Stack } from "expo-router";

import { useTheme } from "@/utils/useTheme";

export default function Layout() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerLargeTitle: true, title: 'Settings' }} />
    </Stack>
  )
}