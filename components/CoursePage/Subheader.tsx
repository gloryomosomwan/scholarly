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
        <View style={[styles.statContainer, { backgroundColor: theme.grey200 }]}>
          <Text style={[styles.statLabelText, { color: theme.grey500 }]}>Grade: </Text>
          <Text style={[styles.statText, { color: theme.text }]}>{grade}</Text>
        </View>
        <View style={[styles.statContainer, { backgroundColor: theme.grey200 }]}>
          <Text style={[styles.statLabelText, { color: theme.grey500 }]}>Credits: </Text>
          <Text style={[styles.statText, { color: theme.text }]}>{credits}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 15,
    justifyContent: 'space-between'
  },
  courseNameText: {
    fontSize: 20,
    fontWeight: '600',
    left: 20,
  },
  statRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: 20,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statText: {
    fontSize: 11,
    fontWeight: '600'
  },
  statLabelText: {
    fontSize: 11,
    fontWeight: '500'
  },
})