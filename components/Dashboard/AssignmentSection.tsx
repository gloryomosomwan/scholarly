import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isBefore } from 'date-fns'

import AssignmentCard from '@/components/Assignment/AssignmentCard'
import EmptyAssignmentSection from '@/components/Empty'

import { useTodayAssignments } from '@/hooks/useDatabase'
import { useTheme } from '@/hooks/useTheme'
import Empty from '@/components/Empty'

export default function AssignmentSection() {
  const theme = useTheme()
  const assignmentData = useTodayAssignments()

  let numberOfOverdueTasks = 0;
  assignmentData.forEach(assignment => {
    if (assignment.due && (assignment.completedAt === undefined) && isBefore(assignment.due, new Date())) numberOfOverdueTasks += 1
  });

  let subheaderText: string;
  if (assignmentData.length === 1) subheaderText = '1 assignment due today'
  else subheaderText = `${assignmentData} assignments due today`

  return (
    <View style={[styles.container, {}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.text }]}>Today's Assignments</Text>
        {assignmentData.length > 0 && <Text style={[styles.subheaderText, { color: theme.grey400 }]}>{subheaderText}</Text>}
        {assignmentData.length > 0
          ? <Text style={[styles.overdueText, { color: theme.grey500 }]}> ({numberOfOverdueTasks} overdue)</Text>
          : <Empty icon='square.and.pencil' text='No assignments due today' />}
      </View>
      {assignmentData.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
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
    marginBottom: 15,
    fontWeight: '600',
    letterSpacing: 0.25
  },
  headerContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
})