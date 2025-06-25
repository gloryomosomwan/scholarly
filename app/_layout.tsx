import { Button } from "react-native";
import { Stack } from "expo-router";

type CourseRouteParams = {
  courseCode?: string;
};

export default function RootLayout() {
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
            backgroundColor: ''
          },
          headerLargeTitleShadowVisible: false,
          headerLargeTitle: true,
          headerRight: () => (<Button title='Edit Course' onPress={() => alert('Editing course! 😂')}></Button>),
        })}
      />
    </Stack>
  )
}