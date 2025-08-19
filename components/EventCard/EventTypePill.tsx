import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getColorWithOpacity } from '@/utils'

type EventTypePillProps = {
  type: string
}

export default function EventTypePill({ type }: EventTypePillProps) {
  const theme = useTheme()
  // const courseColor = courses.find(course => course.code === event.course)?.color ?? theme.grey400
  const courseColor = 'red'
  return (
    <View style={[styles.background, { backgroundColor: getColorWithOpacity(courseColor, 0.25) }]}>
      <Text style={[styles.text, { color: courseColor }]}>{type}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
})