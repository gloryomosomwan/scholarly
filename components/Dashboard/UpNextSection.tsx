import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isAfter } from 'date-fns'

import EventCard from '@/components/EventCard/EventCard'

import { useTheme } from '@/hooks/useTheme'
import { useEventsByDay } from '@/hooks/useDatabase'
import { useCalendarStore } from '@/stores/calendar'
import { sortEventsByStart } from '@/utils/sort'

export default function UpNextSection() {
  const theme = useTheme()
  const { todayDate } = useCalendarStore()
  const events = useEventsByDay(todayDate)
  events.sort(sortEventsByStart)

  let upNext = null
  for (let event of events) {
    if (isAfter(event.startDate, new Date())) {
      upNext = event
      break;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Up Next:</Text>
      {upNext ?
        <EventCard key={upNext.id} event={upNext} />
        :
        <View>
          <Text style={styles.placeholderText}>No events up next</Text>
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