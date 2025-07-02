import { Stack } from "expo-router";

import { useTheme } from "@/utils/useTheme";

export default function Layout() {
  const theme = useTheme()
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="settings" options={{
        title: 'Settings',
        headerLargeTitle: true,
        headerStyle: { backgroundColor: theme.primary },
        contentStyle: { backgroundColor: theme.primary },
        headerLargeTitleShadowVisible: false,
        headerTintColor: theme.text
      }} />
    </Stack>
  )
}