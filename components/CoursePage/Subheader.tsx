import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/utils/useTheme'

type SubheaderProps = {
  courseName?: string
  credits?: string
  grade?: string
}

export default function Subheader({ courseName, grade, credits }: SubheaderProps) {
  const theme = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text style={[styles.courseNameText, { color: theme.grey600 }]}>{courseName}</Text>
      <View style={styles.statRowContainer}>
        <View style={styles.statContainer}>
          <Text style={[styles.statText, { color: theme.text }]}>{grade}</Text>
          <Text style={[styles.statLabelText, { color: theme.grey500 }]}>CURRENT GRADE</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={[styles.statText, { color: theme.text }]}>{credits}</Text>
          <Text style={[styles.statLabelText, { color: theme.grey500 }]}>CREDITS</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  courseNameText: {
    fontSize: 20,
    fontWeight: '600',
    left: 20,
  },
  statRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statContainer: {
    alignItems: 'center'
  },
  statText: {
    fontSize: 30,
    fontWeight: '600'
  },
  statLabelText: {
    fontSize: 13,
    fontWeight: '500'
  },
})