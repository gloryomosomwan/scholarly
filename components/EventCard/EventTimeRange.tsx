import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { formatTime } from '@/utils'
import dayjs from '@/utils/dayjs'

type EventTimeRangeProps = {
  startDate: Date
  endDate: Date
  isCurrentEvent: boolean
}

export default function EventTimeRange({ startDate, endDate, isCurrentEvent }: EventTimeRangeProps) {
  const theme = useTheme()
  const now = dayjs()
  const isUpNext = now.isBefore(startDate)
  let timeFromNowString
  if (isUpNext) {
    timeFromNowString = dayjs(startDate).fromNow()
    timeFromNowString = timeFromNowString.charAt(0).toUpperCase() + timeFromNowString.slice(1)
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.rangeText, { color: theme.grey600 }]}>
        {formatTime(startDate)} - {formatTime(endDate)}
      </Text>
      <Text style={[styles.agoText, { color: theme.grey400 }]}>
        {!isCurrentEvent && timeFromNowString}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  rangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  agoText: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },
})