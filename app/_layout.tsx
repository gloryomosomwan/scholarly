import { Button } from "react-native";
import { Stack } from "expo-router";

type CourseRouteParams = {
  courseName?: string;
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false
      }}
      />
      <Stack.Screen name="[courseName]"
        options={({ route }: { route: { params?: CourseRouteParams } }) => ({
          title: route.params?.courseName,
          headerBackTitle: 'Courses',
          headerRight: () => (<Button title='Edit Course' onPress={() => alert('Editing course! 😂')}></Button>),
          headerLargeTitle: true,
        })}
      />
    </Stack>
  )
}