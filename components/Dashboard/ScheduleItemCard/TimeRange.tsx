import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { formatTime } from '@/utils'
import dayjs from '@/utils/dayjs'

type TimeRangeProps = {
  startDate: Date
  endDate: Date
  isHappening: boolean
}

export default function TimeRange({ startDate, endDate, isHappening }: TimeRangeProps) {
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
      {!isHappening && <Text style={[styles.agoText, { color: theme.grey400 }]}> {timeFromNowString} </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginLeft: 'auto'
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