import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { addDays, isSameDay, subDays } from 'date-fns'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'
import { useCalendarStore } from '@/stores/calendar'

type TimeRangeProps = {
  start: Date
  end: Date
  eventWasEarlierToday: boolean
}

export default function TimeRange({ start, end, eventWasEarlierToday }: TimeRangeProps) {
  const theme = useTheme()
  const { currentDate } = useCalendarStore()
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* CHECK */}
        {isSameDay(start, subDays(currentDate, 1)) && <SymbolView name='arrow.turn.up.left' size={11} />}
        <Text style={[styles.startText, { color: eventWasEarlierToday ? theme.grey400 : theme.text }]}>
          {start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}
        </Text>
      </View>
      <View style={styles.row}>
        {/* CHECK */}
        {isSameDay(end, addDays(currentDate, 1)) && <SymbolView name='arrow.turn.down.right' size={11} />}
        <Text style={[styles.endText, { color: theme.grey400 }]}>
          {end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}
        </Text>
      </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4
  }
})