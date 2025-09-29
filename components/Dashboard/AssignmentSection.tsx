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
  assignmentData.forEach(assignment => {
    if (assignment.due && (assignment.completedAt === undefined) && isBefore(assignment.due, new Date())) numberOfOverdueTasks += 1
  });

  let subheaderText: string;
  if (assignmentData.length === 0) subheaderText = 'No assignments due today'
  else if (assignmentData.length === 1) subheaderText = '1 assignment due today'
  else subheaderText = `${assignmentData} assignments due today`

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRowContainer}>
          <Text style={[styles.headerText, { color: theme.text }]}>Today's Assignments:</Text>
        </View>
        <Text style={[styles.subheaderText, { color: theme.grey400 }]}>
          {subheaderText}
          {assignmentData.length > 0 && <Text style={[styles.overdueText, { color: theme.grey500 }]}> ({numberOfOverdueTasks} overdue)</Text>}
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
  overdueText: {
    fontSize: 16,
    fontWeight: '700'
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