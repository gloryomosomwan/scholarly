import { StyleSheet, Text } from 'react-native'
import React from 'react'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'

type EventTypeModalItemProps = {
  eventType: string
  onSelect: () => void
}

export default function EventTypeModalItem({ eventType, onSelect }: EventTypeModalItemProps) {
  const theme = useTheme()
  const text = eventType?.replace(/\w/, c => c.toUpperCase())
  return (
    <PressableOpacity
      style={[styles.container, { backgroundColor: theme.secondary }]}
      onPress={() => onSelect()}
    >
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
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
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
})