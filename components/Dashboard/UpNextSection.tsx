import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from '@/hooks/useTheme'
import { useItemsWithinNextDay } from '@/hooks/useDatabase'
import { getUpNextScheduleItems } from '@/utils/scheduleItem'
import { pretty, refresh } from '@/utils'

import ScheduleItemElement from '@/components/ScheduleItemElement'

export default function UpNextSection() {
  const theme = useTheme()
  const [now, setNow] = useState(new Date())
  refresh(setNow)
  const itemsWithinNextDay = useItemsWithinNextDay(now)
  const upNextItems = getUpNextScheduleItems(itemsWithinNextDay)
  let scheduleElements: React.JSX.Element[] = []

  if (upNextItems) {
    scheduleElements = upNextItems.map((item) => {
      const key = `${item.id}.${item.startDate}.${item.type}`
      return <ScheduleItemElement item={item} key={key} />
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