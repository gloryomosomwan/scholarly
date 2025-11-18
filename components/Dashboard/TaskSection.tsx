import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isBefore } from 'date-fns'

import TaskCard from '@/components/TaskCard/TaskCard'
import Empty from '@/components/Empty'

import { useTasksForToday } from '@/hooks/useDatabase'
import { useTheme } from '@/hooks/useTheme'

export default function TaskSection() {
  const theme = useTheme()
  const taskData = useTasksForToday()

  let numberOfOverdueTasks = 0;
  taskData.forEach(task => {
    if (task.due && (task.completedAt === undefined) && isBefore(task.due, new Date())) numberOfOverdueTasks += 1
  });

  let subheaderText: string;
  if (taskData.length === 1) subheaderText = '1 task due today'
  else subheaderText = `${taskData} tasks due today`

  return (
    <View style={[styles.container, {}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: theme.text }]}>Today's Tasks</Text>
        {taskData.length > 0 && <Text style={[styles.subheaderText, { color: theme.grey400 }]}>{subheaderText}</Text>}
        {taskData.length > 0
          ? <Text style={[styles.overdueText, { color: theme.grey500, }]}> ({numberOfOverdueTasks} overdue)</Text>
          : <Empty icon='checklist.checked' text='No tasks due today' />}
      </View>
      {taskData.map((task) => <TaskCard key={task.id} task={task} />)}
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