import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type EventItemHeaderProps = {
  eventWasEarlierToday: boolean
  hasCourse: boolean
  eventType: string;
  eventName: string | undefined;
}

export default function EventItemHeader({ eventWasEarlierToday, hasCourse, eventType, eventName }: EventItemHeaderProps) {
  const theme = useTheme()
  let text;
  if (hasCourse && eventType !== 'general') {
    text = eventType?.replace(/\w/, c => c.toUpperCase())
  }
  else {
    text = eventName || '(No title)'
  }
  return (
    <View style={styles.container}>
      {hasCourse && <Text style={styles.icon}>{'📚'}</Text>}
      <Text style={[styles.text, { color: eventWasEarlierToday ? theme.grey400 : theme.text }]}>{text}</Text>
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