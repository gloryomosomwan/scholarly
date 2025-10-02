import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import EventCard from '@/components/EventCard/EventCard'
import EventBar from '@/components/EventCard/EventBar'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvents } from '@/hooks/useDatabase'
import { getEventClass } from '@/utils/event'
import { refresh } from '@/utils'

export default function CurrentEventSection() {
  const theme = useTheme()
  const events = useCurrentEvents()
  const [now, setNow] = useState(new Date())
  refresh(setNow)
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
      {events.map(function (event) {
        const eventClass = getEventClass(event.startDate, event.endDate)
        if (eventClass === 'regular' || eventClass === 'crossover') return <EventCard key={`${event.id}.${event.startDate}`} event={event} />
        else return <EventBar key={`${event.id}.${event.startDate}`} event={event} date={now} />
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