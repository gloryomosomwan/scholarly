import { Stack } from "expo-router";
import { useState } from "react";

import { CurrentCourseContext } from "@/context/CourseContext";
import { Button } from "react-native";

export default function RootLayout() {
  const [currentCourse, setCurrentCourse] = useState<string | null>(null)

  return (
    <CurrentCourseContext.Provider value={{ currentCourse, setCurrentCourse }} >
      <Stack>
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(course)" options={{
          headerTitle: currentCourse || 'Course',
          headerBackTitle: 'Courses',
          headerRight: () => (<Button title='Edit Course' onPress={() => alert('Editing course! 😂')}></Button>),
          headerLargeTitle: true
        }} />
      </Stack>
    </CurrentCourseContext.Provider>
  )
}
