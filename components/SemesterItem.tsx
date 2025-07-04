import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import PressableOpacity from '@/components/PressableOpacity'
import { Semester } from '@/types'

export type SemesterItemProps = {
  item: Semester
  onPress?: () => void
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function SemesterItem({ item, onPress }: SemesterItemProps) {
  const theme = useTheme()
  return (
    <PressableOpacity
      style={[styles.semesterItem, { backgroundColor: theme.primary }]}
      onPress={onPress}
    >
      <View style={styles.semesterInfo}>
        <Text style={[styles.semesterName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.semesterDates, { color: theme.grey500 }]}>
          {formatDate(item.start)} to {formatDate(item.end)}
        </Text>
      </View>
      <View style={styles.courseCountContainer}>
        <Text style={[styles.courseCount, { color: theme.accent }]}>
          {item.numberOfCourses} courses
        </Text>
      </View>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  semesterItem: {
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  semesterInfo: {
    flex: 1,
  },
  semesterName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  semesterDates: {
    fontSize: 14,
    fontWeight: '400',
  },
  courseCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseCount: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 4,
  },
})