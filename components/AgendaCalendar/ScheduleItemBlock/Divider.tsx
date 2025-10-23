import { DimensionValue, StyleSheet, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type DividerProps = {
  startDate: Date
  endDate: Date
  eventWasEarlierToday: boolean
  courseColor: string | undefined
}

export default function Divider({ eventWasEarlierToday, courseColor, startDate, endDate }: DividerProps) {
  const theme = useTheme()
  const eventStartMS = startDate.getTime()
  const eventEndMS = endDate.getTime()
  const isHappeningNow = (() => {
    if (Date.now() > eventStartMS && Date.now() < eventEndMS) {
      return true
    }
    return false
  })()
  const dynamicDividerHeightPct: DimensionValue = (() => {
    if (isHappeningNow) {
      let gap = eventEndMS - eventStartMS
      let soFar = Date.now() - eventStartMS
      let percentage = (soFar / gap) * 100
      return `${Math.floor(percentage)}%`
    }
    return '0%'
  })()
  return (
    <View style={styles.container}>
      <View style={[styles.staticDivider, { backgroundColor: eventWasEarlierToday ? theme.grey400 : courseColor }]} />
      <View style={[styles.dynamicDivider, { backgroundColor: theme.grey400, height: dynamicDividerHeightPct }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 3,
  },
  staticDivider: {
    height: '100%',
    width: 3,
    borderRadius: 90,
  },
  dynamicDivider: {
    width: 3,
    borderRadius: 90,
    position: 'absolute'
  },
})