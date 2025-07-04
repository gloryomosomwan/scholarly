import { StyleSheet, Text } from 'react-native'
import React from 'react'

import { usePriorityPalette } from '@/hooks'
import PressableOpacity from '@/components/PressableOpacity'

type PriorityItemProps = {
  level: string
  onSelect: () => void
}

export default function PriorityItem({ level, onSelect }: PriorityItemProps) {
  const priorityPalette = usePriorityPalette(level)
  const levelText = level.toUpperCase()

  return (
    <PressableOpacity
      style={[styles.container, { backgroundColor: priorityPalette.backgroundColor }]}
      onPress={() => onSelect()}
    >
      <Text style={[styles.codeText, { color: priorityPalette.color }]}>{levelText}</Text>
    </PressableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 50,
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  codeText: {
    fontSize: 20,
    fontWeight: '600',
  },
})