import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type ScheduleItemHeaderProps = {
  eventWasEarlierToday: boolean
  hasCourse: boolean
  eventType: string
  eventName: string | undefined
  courseColor: string | undefined
}

export default function ScheduleItemHeader({ eventWasEarlierToday, hasCourse, eventType, eventName, courseColor }: ScheduleItemHeaderProps) {
  const theme = useTheme()
  let text;
  if (eventType !== 'general' && eventType !== 'test') {
    text = eventType?.replace(/\w/, c => c.toUpperCase())
  }
  else {
    text = eventName
  }
  const testStyle: TextStyle = { fontWeight: '500', color: eventWasEarlierToday ? theme.grey400 : courseColor }
  return (
    <View style={styles.container}>
      {hasCourse && <Text style={styles.icon}>{'📚'}</Text>}
      <Text style={[styles.text, { color: eventWasEarlierToday ? theme.grey400 : theme.text }, eventType === 'test' && testStyle]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 21,
  },
})