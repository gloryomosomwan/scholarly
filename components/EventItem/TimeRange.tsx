import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type TimeRangeProps = {
  startDate: Date
  endDate: Date
  eventWasEarlierToday: boolean
}

export default function TimeRange({ startDate, endDate, eventWasEarlierToday }: TimeRangeProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.startText, { color: eventWasEarlierToday ? theme.grey400 : theme.text }]}>{startDate.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
      <Text style={[styles.endText, { color: theme.grey400 }]}>{endDate.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    marginRight: 3
  },
  startText: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'right',
  },
  endText: {
    fontSize: 14,
    textAlign: 'right'
  },
})