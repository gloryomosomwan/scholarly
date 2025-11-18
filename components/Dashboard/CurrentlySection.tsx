import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'
import ScheduleItemBar from '@/components/ScheduleItemBar'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvents, useCurrentTests } from '@/hooks/useDatabase'
import { getScheduleItemClass } from '@/utils/scheduleItem'
import { pretty, refresh } from '@/utils'
import { sortByItemClass, sortScheduleItems } from '@/utils/sort'
import { Event, Test } from '@/types'
import Empty from '../Empty'

export default function CurrentlySection() {
  const theme = useTheme()
  const [now, setNow] = useState(new Date())
  const events = useCurrentEvents(now)
  const tests = useCurrentTests(now)
  const scheduleItems = [...tests, ...events]
  scheduleItems.sort(sortScheduleItems)
  scheduleItems.sort(sortByItemClass)
  refresh(setNow)
  function createScheduleItems(item: Test | Event) {
    const key = `${item.id}.${item.startDate}.${item.type}`
    const itemClass = getScheduleItemClass(item.startDate, item.endDate)
    if (itemClass === 'regular' || itemClass === 'crossover') return <ScheduleItemCard key={key} item={item} />
    else return <ScheduleItemBar key={key} item={item} date={now} />
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Currently</Text>
      {scheduleItems.length > 0
        ? scheduleItems.map(createScheduleItems)
        : <Empty icon='calendar.day.timeline.leading' text='Nothing happening right now' />}
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