import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import * as SplashScreen from 'expo-splash-screen';
import * as SQLite from 'expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"

import { useTheme } from "@/hooks";
import Auth from "@/components/Auth";

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 500,
});

export default function RootLayout() {
  const theme = useTheme()
  const [session, setSession] = useState<Session | null>(null)
  const [appIsReady, setAppIsReady] = useState(false)
  const db = SQLite.openDatabaseSync('databaseName')
  useDrizzleStudio(db);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAppIsReady(true)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView}>
      <SQLiteProvider databaseName="databaseName">
        {
          session && session.user ?
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
              <Stack.Screen
                name="semester-form"
                options={{
                  headerShown: false,
                  presentation: 'modal'
                }}
              />
              <Stack.Screen
                name="exam-form"
                options={{
                  headerShown: false,
                  presentation: 'modal'
                }}
              />
            </Stack>
            :
            <Auth />
        }
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}