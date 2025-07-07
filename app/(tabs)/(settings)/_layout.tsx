import { Stack } from "expo-router";

import { useTheme } from "@/hooks";

export default function Layout() {
  const theme = useTheme()
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: theme.primary },
      contentStyle: { backgroundColor: theme.primary },
      headerLargeTitleShadowVisible: false,
      headerTintColor: theme.text
    }}>
      <Stack.Screen name="index" options={{
        title: 'Settings',
        headerLargeTitle: true,
      }} />
      <Stack.Screen name="notifications" options={{
        title: 'Notifications'
      }} />
    </Stack>
  )
}