import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'
import { getCourseById } from '@/hooks/useDatabase'

type EventHeaderProps = {
  courseID: number | undefined
}

export default function EventHeader({ courseID }: EventHeaderProps) {
  const theme = useTheme()
  const courseColor = 'red'
  // const course = getCourseById(courseID)
  const courseCode = 'HIST 211'
  return (
    <View style={styles.courseTitleContainer}>
      <SymbolView name={'book'} size={28} tintColor={courseColor} style={[styles.courseIcon]} />
      <Text style={[styles.courseTitleText, { color: theme.text }]}>{courseCode}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  courseTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  courseTitleText: {
    fontSize: 30,
    fontWeight: '600',
    // marginBottom: 4,
  },
  courseIcon: {
    marginRight: 5
  },
})