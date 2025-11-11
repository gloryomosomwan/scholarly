import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { Weekday } from 'rrule'

import { useTheme } from '@/hooks/useTheme'

type DayProps = {
  value: Weekday
  selected: boolean
}

export default function Day({ value, selected }: DayProps) {
  const theme = useTheme()
  const selectedStyles: TextStyle = { fontWeight: 700, color: theme.accent }
  return (
    <View style={styles.container}>
      <Text style={[{ color: theme.text }, selected && selectedStyles]}>{value.toString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  }
})