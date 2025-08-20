import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type EventItemCourseTextProps = {
  courseCode: string | undefined
  courseColor: string | undefined
}

export default function EventItemCourseText({ courseColor, courseCode }: EventItemCourseTextProps) {
  const theme = useTheme()
  return (
    <Text style={[styles.text, { color: courseColor }]}>{courseCode}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15
  }
})