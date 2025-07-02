import { Stack } from "expo-router";

import { useTheme } from "@/utils/useTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const theme = useTheme()

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{ contentStyle: { backgroundColor: theme.secondary } }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: theme.secondary },
            headerTintColor: theme.accent,
            headerShadowVisible: false
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}