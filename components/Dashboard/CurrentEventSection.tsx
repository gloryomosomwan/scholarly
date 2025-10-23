import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'
import ScheduleItemBar from '@/components/Dashboard/ScheduleItemCard/ScheduleItemBar'

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
  refresh(setNow)
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
      {scheduleItems.map(function (item) {
        const eventClass = getEventClass(item.startDate, item.endDate)
        if (eventClass === 'regular' || eventClass === 'crossover') return <ScheduleItemCard key={`${item.id}.${item.startDate}`} item={item} />
        else return <ScheduleItemBar key={`${item.id}.${item.startDate}`} item={item} date={now} />
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