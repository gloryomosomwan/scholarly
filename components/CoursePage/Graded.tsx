import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'

type GradedProps = {
  grade: number
}

export default function Graded({ grade }: GradedProps) {
  const theme = useTheme()

  return (
    <View style={[styles.gradeContainer, { backgroundColor: theme.successBackground }]} >
      <Text style={[styles.gradeLabelText, { color: theme.successText }]}>Grade</Text>
      <Text style={[styles.gradeText, { color: theme.successText }]}>{grade}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  gradeContainer: {
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  gradeLabelText: {
    fontSize: 20,
    fontWeight: '600'
  },
  gradeText: {
    fontSize: 20,
    fontWeight: '600'
  }
})