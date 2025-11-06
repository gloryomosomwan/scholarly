import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { isSameDay } from 'date-fns';

import { useTheme } from '@/hooks/useTheme'
import { getScheduleItemClass } from '@/utils/scheduleItem';

type CrossoverRelativeTimeProps = {
  start: Date;
  end: Date
}

export default function CrossoverRelativeTime({ start, end }: CrossoverRelativeTimeProps) {
  const theme = useTheme()
  const itemClass = getScheduleItemClass(start, end)
  let string = null;
  if (itemClass === 'crossover') {
    const today = new Date()
    if (isSameDay(today, start)) string = `Ends tomorrow`
    else if (isSameDay(today, end)) string = `Started yesterday`
  }
  return (
    <Text style={[styles.text, { color: theme.grey400 }]}>{string || ''}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-end',
    fontSize: 12.5
  }
})