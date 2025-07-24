import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ActivityCard from '@/components/Activity/ActivityCard'

import { useTasks } from '@/hooks/useTasks'
import { useTheme } from '@/hooks/useTheme'

export default function TaskSection() {
  const theme = useTheme()
  const activityData = useTasks()
  return (
    <View>
      <View style={styles.tasksHeaderContainer}>
        <View style={styles.tasksHeaderTopRowContainer}>
          <Text style={[styles.taskHeaderText, { color: theme.text }]}>Today's Tasks:</Text>
        </View>
        <Text style={[styles.subheaderText, { color: theme.grey400 }]}>
          3 tasks due today
          <Text style={[styles.subheaderText, { color: theme.grey500, fontWeight: 700 }]} > (1 overdue)</Text>
        </Text>
      </View>
      {activityData.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  subheaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskHeaderText: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: '600',
    letterSpacing: 0.25
  },
  tasksHeaderContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  tasksHeaderTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})