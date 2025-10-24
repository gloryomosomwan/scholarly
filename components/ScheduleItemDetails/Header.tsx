import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'
import { Event, Test } from '@/types'
import { getCourseById } from '@/hooks/useDatabase'

type HeaderProps = {
  item: Event | Test | null
}

export default function Header({ item: item }: HeaderProps) {
  const theme = useTheme()
  const text = item?.type === 'general' || item?.type === 'test' ? (item.name || '(No name)') : item?.type.replace(/\w/, c => c.toUpperCase())
  const course = getCourseById(item?.courseID || null)
  return (
    <View style={[styles.container, {}]}>
      <SymbolView name='square.fill' tintColor={course?.color || theme.grey400} style={{ width: 30 }} />
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  text: {
    fontSize: 40
  },
})