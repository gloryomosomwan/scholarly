import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getColorWithOpacity } from '@/utils'

type PillProps = {
  text: string
  courseColor: string | undefined
}

export default function Pill({ text, courseColor }: PillProps) {
  const theme = useTheme()
  const itemHasCourse: boolean = courseColor !== undefined
  if (!itemHasCourse) text = text?.replace(/\w/, c => c.toUpperCase())
  return (
    <View style={[styles.container, { backgroundColor: courseColor ? getColorWithOpacity(courseColor, 0.25) : theme.grey200 }]}>
      <Text style={[styles.text, { color: courseColor ?? theme.grey400 }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
})