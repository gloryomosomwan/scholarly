import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getColorWithOpacity } from '@/utils'

type EventPillProps = {
  text: string
  courseColor: string | undefined
}

export default function EventPill({ text, courseColor }: EventPillProps) {
  const theme = useTheme()
  const eventHasCourse: boolean = courseColor !== undefined
  if (!eventHasCourse) text = text?.replace(/\w/, c => c.toUpperCase())
  return (
    <View style={[styles.background, { backgroundColor: courseColor ? getColorWithOpacity(courseColor, 0.25) : theme.grey200 }]}>
      <Text style={[styles.text, { color: courseColor }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
})