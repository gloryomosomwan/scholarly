import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

import { useTheme } from "@/hooks";
import Auth from "@/components/Auth";

export default function RootLayout() {
  const theme = useTheme()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  )
}