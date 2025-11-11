import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type Title = {
  eventType: string
}

export default function Title({ eventType }: Title) {
  const theme = useTheme()
  const text = eventType.replace(/\w/, c => c.toUpperCase())
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.typeText, { color: theme.text }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 10
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
})