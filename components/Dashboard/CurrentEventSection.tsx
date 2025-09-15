import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import EventCard from '@/components/EventCard/EventCard'
import EventBar from '@/components/EventCard/EventBar'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvent } from '@/hooks/useDatabase'

const MILLISECONDSINADAY = 86400000

type CurrentEventSectionProps = {

}

export default function CurrentEventSection({ }: CurrentEventSectionProps) {
  const theme = useTheme()
  const events = useCurrentEvent()
  const today = new Date()
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
      {events.map(function (event) {
        const duration = event.endDate.getTime() - event.startDate.getTime()
        if (duration < MILLISECONDSINADAY) return <EventCard key={event.id} event={event} />
        else return <EventBar key={event.id} event={event} date={today} multiday={duration > MILLISECONDSINADAY} />
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