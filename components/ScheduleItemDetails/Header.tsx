import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'
import { Event } from '@/types'
import { getCourseById } from '@/hooks/useDatabase'

type HeaderProps = {
  event: Event | null
}

export default function Header({ event }: HeaderProps) {
  const theme = useTheme()
  const text = event?.type === 'general' ? (event.name || '(No name)') : event?.type.replace(/\w/, c => c.toUpperCase())
  const course = getCourseById(event?.courseID || null)
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