import { StyleSheet, Text } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import PressableOpacity from '@/components/PressableOpacity'

type PriorityItemProps = {
  level: string
  onSelect: () => void
}

export default function PriorityItem({ level, onSelect }: PriorityItemProps) {
  const theme = useTheme()
  let textColor;
  let backgroundColor;

  switch (level) {
    case "high":
      textColor = theme.dangerText
      backgroundColor = theme.dangerBackground
      break;
    case "medium":
      textColor = theme.warningText
      backgroundColor = theme.warningBackground
      break;
    case "low":
      textColor = theme.successText
      backgroundColor = theme.successBackground
      break;
  }

  const levelText = level.toUpperCase()

  return (
    <PressableOpacity style={[styles.container, { backgroundColor: backgroundColor }]} onPress={() => onSelect()}>
      <Text style={[styles.codeText, { color: textColor }]}>{levelText}</Text>
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