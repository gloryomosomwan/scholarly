import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type EventHeaderProps = {
  text: string
  eventWasEarlierToday: boolean
}

export default function EventHeader({ text, eventWasEarlierToday }: EventHeaderProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{'📚'}</Text>
      <Text style={[styles.text, { color: eventWasEarlierToday ? theme.grey400 : theme.text }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 21,
  },
})