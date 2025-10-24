import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isAfter } from 'date-fns'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'

import { useTheme } from '@/hooks/useTheme'
import { useEventsByDay, useTestsByDay } from '@/hooks/useDatabase'
import { useCalendarStore } from '@/stores/calendar'
import { sortScheduleItems } from '@/utils/sort'
import { getScheduleItemClass } from '@/utils/scheduleItem'

export default function UpNextSection() {
  const theme = useTheme()
  const { todayDate } = useCalendarStore()
  const events = useEventsByDay(todayDate)
  events.sort(sortScheduleItems)
  const tests = useTestsByDay(todayDate)
  tests.sort(sortScheduleItems)
  const scheduleItems = [...tests, ...events]

  let upNext = null
  for (let item of scheduleItems) {
    if (isAfter(item.startDate, new Date())) {
      upNext = item
      break;
    }
  }

  const eventClass = upNext && getScheduleItemClass(upNext.startDate, upNext.endDate)

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Up Next:</Text>
      {upNext && eventClass && (eventClass === 'regular' || eventClass === 'crossover') ?
        <View>
          {<ScheduleItemCard key={upNext.id} item={upNext} />}
        </View>
        :
        <View>
          <Text style={[styles.placeholderText, { color: theme.grey400 }]}>No events up next</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '400'
  },
  headerText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25
  },
})