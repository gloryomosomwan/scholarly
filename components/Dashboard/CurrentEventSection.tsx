import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import EventCard from '@/components/EventCard/EventCard'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvent } from '@/hooks/useDatabase'

type CurrentEventSectionProps = {

}

export default function CurrentEventSection({ }: CurrentEventSectionProps) {
  const theme = useTheme()
  const events = useCurrentEvent()
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
      {events.map((event) => <EventCard key={event.id} event={event} />)}
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