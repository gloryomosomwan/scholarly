import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import EventCard from '@/components/EventCard/EventCard'
import EventBar from '@/components/EventCard/EventBar'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvents, useCurrentTests } from '@/hooks/useDatabase'
import { getEventClass } from '@/utils/event'
import { refresh } from '@/utils'

export default function CurrentEventSection() {
  const theme = useTheme()
  const [now, setNow] = useState(new Date())
  const events = useCurrentEvents(now)
  const tests = useCurrentTests(now)
  const scheduleItems = [...tests, ...events]
  // console.log(scheduleItems[0])
  refresh(setNow)
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
      {scheduleItems.map(function (item) {
        const eventClass = getEventClass(item.startDate, item.endDate)
        if (eventClass === 'regular' || eventClass === 'crossover') return <EventCard key={`${item.id}.${item.startDate}`} event={item} />
        else return <EventBar key={`${item.id}.${item.startDate}`} event={item} date={now} />
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