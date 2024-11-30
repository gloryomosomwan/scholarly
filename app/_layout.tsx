import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        // headerTitle: 'Dashboard',
        // headerShadowVisible: true,
        // headerTransparent: true,
        // headerBlurEffect: 'light',
        headerShown: false
      }} />
    </Stack>
  )
}
