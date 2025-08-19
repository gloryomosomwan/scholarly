import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getColorWithOpacity } from '@/utils'

type EventTypePillProps = {
  type: string
  courseColor: string | undefined
}

export default function EventTypePill({ type, courseColor }: EventTypePillProps) {
  const theme = useTheme()
  return (
    <View style={[styles.background, { backgroundColor: courseColor ? getColorWithOpacity(courseColor, 0.25) : theme.grey200 }]}>
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