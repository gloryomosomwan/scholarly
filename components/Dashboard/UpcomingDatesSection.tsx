import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getUpNextScheduleItems } from '@/utils/scheduleItem'
import { useUpcomingScheduleItems, useUpcomingTests } from '@/hooks/useDatabase'

import ScheduleItemElement from '@/components/ScheduleItemElement'

type UpcomingDatesSectionProps = {}

export default function UpcomingDatesSection({ }: UpcomingDatesSectionProps) {
  const theme = useTheme()
  const scheduleItems = useUpcomingScheduleItems()
  const upNextItems = getUpNextScheduleItems(scheduleItems)
  const upNextItemsFiltered = upNextItems?.filter(item => item.type === 'test')
  const upcomingTests = useUpcomingTests()
  const upcomingTestsFiltered = upcomingTests.filter(test => !upNextItemsFiltered?.some(ft => ft.id === test.id))
  const scheduleElements = upcomingTestsFiltered.map((item) => {
    const key = `${item.id}.${item.startDate}.${item.type}`
    return <ScheduleItemElement item={item} key={key} />
  })
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates:</Text>
      {scheduleElements.length > 0
        ? scheduleElements
        : <Text style={[styles.placeholderText, { color: theme.grey400 }]}>{"No upcoming dates"}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  headerText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '400'
  },
})