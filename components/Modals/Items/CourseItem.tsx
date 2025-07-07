import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

type CourseItemProps = {
  code: string
  name: string
  color: string
  onSelect?: (course: { code: string }) => void
}

export default function CourseItem({ name, code, color, onSelect }: CourseItemProps) {
  const theme = useTheme()
  return (
    <PressableOpacity
      style={[styles.container, { backgroundColor: theme.secondary }]}
      onPress={() => onSelect?.({ code })}
    >
      <View style={[styles.tag, { backgroundColor: color }]}>
        <Text style={[styles.codeText, { color: 'white' }]}>{code}</Text>
      </View>
      <Text style={[styles.nameText, { color: theme.text }]}>{name}</Text>
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
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
})