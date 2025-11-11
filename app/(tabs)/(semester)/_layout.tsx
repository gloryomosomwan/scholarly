import { Button } from "react-native";
import { router, Stack } from "expo-router";

import { useTheme } from "@/hooks";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

type CourseRouteParams = {
  courseCode?: string;
  color?: string
  id?: string
};

export default function Layout() {
  const theme = useTheme()

  return (
    <BottomSheetModalProvider>
      <Stack screenOptions={{ contentStyle: { backgroundColor: theme.secondary } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
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
            headerRight: () => (<Button color={route.params?.color} title='Edit Course' onPress={() => router.navigate({
              pathname: '/course-form',
              params: { id: route.params?.id }
            })} />),
          })}
        />
      </Stack>
    </BottomSheetModalProvider>
  )
}