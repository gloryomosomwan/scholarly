import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type CourseTextProps = {
  courseCode: string | undefined
  courseColor: string | undefined
  eventWasEarlierToday: boolean
  eventType: string
}

export default function CourseText({ courseColor, courseCode, eventWasEarlierToday, eventType }: CourseTextProps) {
  const theme = useTheme()
  const testStyle: TextStyle = { fontWeight: '500' }
  return (
    <Text style={[styles.text, { color: eventWasEarlierToday ? theme.grey400 : courseColor }, eventType === 'test' && testStyle]}>{courseCode}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15
  }
})