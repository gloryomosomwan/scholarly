import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'
import ScheduleItemBar from '@/components/ScheduleItemBar'

import { useTheme } from '@/hooks/useTheme'
import { useCurrentEvents, useCurrentTests } from '@/hooks/useDatabase'
import { getScheduleItemClass } from '@/utils/scheduleItem'
import { refresh } from '@/utils'

export default function CurrentlySection() {
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
        const key = `${item.id}.${item.startDate}.${item.type}`
        const itemClass = getScheduleItemClass(item.startDate, item.endDate)
        if (itemClass === 'regular' || itemClass === 'crossover') return <ScheduleItemCard key={key} item={item} />
        else return <ScheduleItemBar key={key} item={item} date={now} />
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