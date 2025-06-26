import { Button } from "react-native";
import { Stack } from "expo-router";

import { useTheme } from "@/utils/useTheme";

type CourseRouteParams = {
  courseCode?: string;
};

export default function RootLayout() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false
      }}
      />
      <Stack.Screen name="[courseCode]"
        options={({ route }: { route: { params?: CourseRouteParams } }) => ({
          // headerTitle: (props) => <Header courseName={route.params?.courseName || 'Course'} />,

          title: route.params?.courseCode,
          headerBackTitle: 'Courses',
          headerStyle: {
            backgroundColor: theme.secondary
          },
          headerLargeTitleShadowVisible: false,
          headerLargeTitle: true,
          headerTitleStyle: { color: theme.text },
          headerRight: () => (<Button title='Edit Course' onPress={() => alert('Editing course! 😂')}></Button>),
        })}
      />
    </Stack>
  )
}