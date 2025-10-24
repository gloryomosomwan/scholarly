import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type CourseTextProps = {
  courseCode: string | undefined
  courseColor: string | undefined
  itemHasOccurred: boolean
  itemType: string
}

export default function CourseText({ courseColor, courseCode, itemHasOccurred, itemType }: CourseTextProps) {
  const theme = useTheme()
  const testStyle: TextStyle = { fontWeight: '500' }
  return (
    <Text style={[styles.text, { color: itemHasOccurred ? theme.grey400 : courseColor }, itemType === 'test' && testStyle]}>{courseCode}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15
  }
})