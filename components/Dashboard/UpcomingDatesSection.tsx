import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getUpNextScheduleItems } from '@/utils/scheduleItem'
import { useItemsWithinNextDay, useUpcomingTests, useCurrentTests } from '@/hooks/useDatabase'
import { refresh } from '@/utils'

import ScheduleItemElement from '@/components/ScheduleItemElement'
import Empty from '../Empty'

type UpcomingDatesSectionProps = {}

export default function UpcomingDatesSection({ }: UpcomingDatesSectionProps) {
  const theme = useTheme()
  const [now, setNow] = useState(new Date())
  refresh(setNow)
  const upcomingTests = useUpcomingTests(now)

  const currentTests = useCurrentTests(now)
  const nonCurrentTests = upcomingTests.filter(upcomingTest => !currentTests?.some(currentTest => currentTest.id === upcomingTest.id)) // filter out tests that appear in current events section

  const itemsWithinNextDay = useItemsWithinNextDay(now)
  const upNextItems = getUpNextScheduleItems(itemsWithinNextDay)
  const upNextTests = upNextItems?.filter(item => item.type === 'test') // grab up next tests
  const nonUpNextTests = nonCurrentTests.filter(upcomingTest => !upNextTests?.some(upNextTest => upNextTest.id === upcomingTest.id)) // filter out tests that appear in up next section

  const scheduleElements = nonUpNextTests.map((item) => {
    const key = `${item.id}.${item.startDate}.${item.type}`
    return <ScheduleItemElement item={item} key={key} />
  })

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates</Text>
      {scheduleElements.length > 0 ? scheduleElements : <Empty icon='calendar' text='No upcoming dates' />}
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