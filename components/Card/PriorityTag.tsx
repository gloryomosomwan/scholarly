import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { usePriorityPalette } from '@/hooks'

type PriorityTagProps = {
  priority: string
}

export default function PriorityTag({ priority }: PriorityTagProps) {
  const priorityPalette = usePriorityPalette(priority)
  return (
    <View style={[styles.container, { backgroundColor: priorityPalette.backgroundColor, borderColor: priorityPalette.borderColor }]}>
      <Text style={[styles.text, { color: priorityPalette.color }]}>
        {priority.toUpperCase()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
})