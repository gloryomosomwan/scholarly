import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'

type CourseTagProps = {
  courseCode: string
  courseColor: string
}

export default function CourseTag({ courseCode, courseColor }: CourseTagProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.grey100 }]}>
      {courseColor && <View style={[styles.dot, { backgroundColor: courseColor }]} />}
      <Text style={[styles.text, { color: theme.text }]}>{courseCode}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
})