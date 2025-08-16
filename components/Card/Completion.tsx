import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'

export default function Completion() {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <View style={[styles.divider, { backgroundColor: theme.grey200 }]} />
      <View style={styles.content}>
        <SymbolView name="checkmark.circle.fill" size={16} tintColor={theme.success} />
        <Text style={[styles.text, { color: theme.successText }]}>Completed</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
})