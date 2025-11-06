import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { useCalendarStore } from '@/stores/calendar'
import { getScheduleItemClass, getUpNextScheduleItems } from '@/utils/scheduleItem'
import { pretty } from '@/utils'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'
import ScheduleItemBar from '@/components/ScheduleItemBar'

export default function UpNextSection() {
  const theme = useTheme()
  const { currentDate } = useCalendarStore()
  const upNextItems = getUpNextScheduleItems()
  let scheduleElements: React.JSX.Element[] = []

  if (upNextItems) {
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