import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isBefore } from 'date-fns'

import AssignmentCard from '@/components/Assignment/AssignmentCard'

import { useTodayAssignments } from '@/hooks/useDatabase'
import { useTheme } from '@/hooks/useTheme'

export default function AssignmentSection() {
  const theme = useTheme()
  const assignmentData = useTodayAssignments()

  let numberOfOverdueTasks = 0;
  for (const el of assignmentData) {
    if (el.due && el.completedAt === undefined) {
      if (isBefore(el.due, new Date())) {
        numberOfOverdueTasks += 1
      }
    }
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRowContainer}>
          <Text style={[styles.headerText, { color: theme.text }]}>Today's Assignments:</Text>
        </View>
        <Text style={[styles.subheaderText, { color: theme.grey400 }]}>
          {assignmentData.length} assignments due today
          <Text style={[styles.subheaderText, { color: theme.grey500, fontWeight: 700 }]}> ({numberOfOverdueTasks} overdue)</Text>
        </Text>
      </View>
      {assignmentData.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  subheaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: '600',
    letterSpacing: 0.25
  },
  headerContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  headerTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})