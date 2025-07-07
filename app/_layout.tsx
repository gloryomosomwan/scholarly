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
          name="(tabs)"
          options={{ headerShown: false }} />
        <Stack.Screen
          name="activity-form"
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
          name="select-semester"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="course-form"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="event-form"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="recurrence-modal"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}