import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import EventCard from '@/components/EventCard/EventCard'
import EventBar from '@/components/EventCard/EventBar'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvents } from '@/hooks/useDatabase'
import { getEventClass } from '@/utils/event'

export default function CurrentEventSection() {
  const theme = useTheme()
  const events = useCurrentEvents()
  const today = new Date()
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
      {events.map(function (event) {
        const eventClass = getEventClass(event)
        if (eventClass === 'regular' || eventClass === 'crossover') return <EventCard key={`${event.id}.${event.startDate}`} event={event} />
        else return <EventBar key={`${event.id}.${event.startDate}`} event={event} date={today} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  headerText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25
  },
})