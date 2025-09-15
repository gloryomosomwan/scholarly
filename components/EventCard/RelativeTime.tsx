import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { isSameDay, formatDistanceToNowStrict } from 'date-fns';

import { useTheme } from '@/hooks/useTheme'

const MILLISECONDSINADAY = 86400000

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
  const duration = end.getTime() - start.getTime()
  if (duration < MILLISECONDSINADAY && !isSameDay(start, end)) {
    const today = new Date()
    if (isSameDay(today, start)) return `Ends tomorrow`
    else if (isSameDay(today, end)) return `Started yesterday`
  }
  else if (duration > MILLISECONDSINADAY) {
    return `Ends in ${formatDistanceToNowStrict(end)}`
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