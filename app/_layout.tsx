import { Button } from "react-native";
import { Stack } from "expo-router";

import { useTheme } from "@/utils/useTheme";

type CourseRouteParams = {
  courseCode?: string;
  color?: string
};

export default function RootLayout() {
  const theme = useTheme()

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: theme.secondary } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[courseCode]"
        options={({ route }: { route: { params?: CourseRouteParams } }) => ({
          title: route.params?.courseCode,
          headerBackTitle: 'Courses',
          headerTintColor: route.params?.color,
          headerStyle: {
            backgroundColor: theme.secondary
          },
          headerLargeTitleShadowVisible: false,
          headerLargeTitle: true,
          headerTitleStyle: { color: theme.text },
          headerRight: () => (<Button color={route.params?.color} title='Edit Course' onPress={() => alert('Editing course! 😂')}></Button>),
        })}
      />
    </Stack>
  )
}