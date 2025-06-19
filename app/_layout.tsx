import { useState } from "react";
import { Button } from "react-native";
import { Stack } from "expo-router";


export default function RootLayout() {
  const [currentCourse, setCurrentCourse] = useState<string | null>(null)

  return (
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
  )
}