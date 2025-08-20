import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type EventItemHeaderProps = {
  text: string | undefined
  eventWasEarlierToday: boolean
  hasCourse: boolean
}

export default function EventItemHeader({ text, eventWasEarlierToday, hasCourse }: EventItemHeaderProps) {
  const theme = useTheme()
  if (hasCourse) text = text?.replace(/\w/, c => c.toUpperCase())
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