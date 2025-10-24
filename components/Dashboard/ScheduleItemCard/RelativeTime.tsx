import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { isSameDay } from 'date-fns';

import { useTheme } from '@/hooks/useTheme'
import { getScheduleItemClass } from '@/utils/scheduleItem';

type RelativeTimeProps = {
  start: Date;
  end: Date
}

export default function RelativeTime({ start, end }: RelativeTimeProps) {
  const theme = useTheme()
  const string = getRelativeTimeString(start, end)
  return (
    <Text style={[styles.text, { color: theme.grey400 }]}>{string}</Text>
  )
}

function getRelativeTimeString(start: Date, end: Date) {
  const itemClass = getScheduleItemClass(start, end)
  if (itemClass === 'crossover') {
    const today = new Date()
    if (isSameDay(today, start)) return `Ends tomorrow`
    else if (isSameDay(today, end)) return `Started yesterday`
  }
  else {
    return ``
  }
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-end',
    fontSize: 12.5
  }
})