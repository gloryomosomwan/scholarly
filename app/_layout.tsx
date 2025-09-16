import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"

import { useTheme } from "@/hooks";
import { sqlite } from "@/db/init";

// SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 500,
});

export default function RootLayout() {
  const theme = useTheme()
  useDrizzleStudio(sqlite);

  return (
    <GestureHandlerRootView >
      <SQLiteProvider databaseName="databaseName">
        <Stack
          screenOptions={{ contentStyle: { backgroundColor: theme.secondary } }}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }} />
          <Stack.Screen
            name="task-form"
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
          <Stack.Screen
            name="semester-form"
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
          <Stack.Screen
            name="test-form"
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
          <Stack.Screen
            name="assignment-form"
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
          <Stack.Screen
            name="event-details"
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
        </Stack>
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}