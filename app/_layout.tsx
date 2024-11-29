import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerTitle: 'Dashboard',
      // headerLargeTitle: true,
      // headerLargeTitleShadowVisible: true,
      headerShadowVisible: true,
      headerTransparent: true,
      headerBlurEffect: 'light'
    }}
  />;
}
