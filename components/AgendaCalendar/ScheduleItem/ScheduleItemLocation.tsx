import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type ScheduleItemLocationProps = {
  eventWasEarlierToday: boolean
  location: string
  courseColor: string | undefined
}

export default function ScheduleItemLocation({ eventWasEarlierToday, location, courseColor }: ScheduleItemLocationProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <SymbolView name="mappin.circle.fill" style={[styles.icon]} tintColor={eventWasEarlierToday ? theme.grey400 : courseColor} type="hierarchical" />
      <Text style={[styles.text, { color: theme.grey400 }]}>{location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 15
  },
  icon: {
    width: 15,
    height: 20,
    marginRight: 6,
  },
})