import { Stack } from "expo-router";

import { useTheme } from "@/hooks";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const theme = useTheme()

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{ contentStyle: { backgroundColor: theme.secondary } }}>
        <Stack.Screen
          name="edit-activity"
          options={{
            // headerTitle: "",
            // headerBackTitle: 'Back',
            // headerStyle: { backgroundColor: theme.accent },
            // headerTintColor: theme.accent,
            // headerShadowVisible: false,
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="selectSemester"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}