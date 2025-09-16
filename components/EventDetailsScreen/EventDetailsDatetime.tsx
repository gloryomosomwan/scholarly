import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type EventDetailsDatetimeProps = {
  start: Date | undefined
  end: Date | undefined
}

export default function EventDetailsDatetime({ start, end }: EventDetailsDatetimeProps) {
  const theme = useTheme()
  const datetimeStringStartDate = `${start?.toLocaleString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at ${start?.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
  const datetimeStringEndDate = `${end?.toLocaleString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at ${end?.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${datetimeStringStartDate} to\n${datetimeStringEndDate}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    left: 50
  },
  text: {
    fontSize: 20,
  },
})