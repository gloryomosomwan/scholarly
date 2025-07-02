import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { useTheme } from "@/utils/useTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const theme = useTheme()

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}