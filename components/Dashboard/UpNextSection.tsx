import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { isEqual } from 'date-fns'

import { useTheme } from '@/hooks/useTheme'
import { useUpcomingEvents, useUpNextTests } from '@/hooks/useDatabase'
import { useCalendarStore } from '@/stores/calendar'
import { sortScheduleItems } from '@/utils/sort'
import { getScheduleItemClass } from '@/utils/scheduleItem'
import { pretty } from '@/utils'
import { Event, Test } from '@/types'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'
import ScheduleItemBar from '@/components/ScheduleItemBar'

export default function UpNextSection() {
  const theme = useTheme()
  const events = useUpcomingEvents()
  const tests = useUpNextTests()
  const scheduleItems = [...tests, ...events]
  scheduleItems.sort(sortScheduleItems)
  let scheduleElements: React.JSX.Element[] = []
  let upNextItems: (Event | Test)[] = []
  const upNext = scheduleItems.shift()
  const { currentDate } = useCalendarStore()

  if (upNext) {
    upNextItems.push(upNext)
    for (let scheduleItem of scheduleItems) {
      if (isEqual(scheduleItem.startDate, upNext?.startDate)) {
        const item = scheduleItems.shift()
        if (item !== undefined) upNextItems.push(item)
      }
      else {
        break
      }
    }
    scheduleElements = upNextItems.map((item) => {
      const key = `${item.id}.${item.startDate}.${item.type}`
      const itemClass = getScheduleItemClass(item.startDate, item.endDate)
      if (itemClass === 'regular' || itemClass === 'crossover') return <ScheduleItemCard key={key} item={item} />
      else return <ScheduleItemBar key={key} item={item} date={currentDate} />
    })
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Up Next:</Text>
      {scheduleElements.length > 0 ? scheduleElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]}>{"No events up next"}</Text>}
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