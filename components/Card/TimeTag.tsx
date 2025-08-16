import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'

export default function TimeTag() {
  const theme = useTheme()
  return (
    <View style={styles.time}>
      <SymbolView name="clock" size={12} tintColor={theme.grey500} />
      <Text style={[styles.text, { color: theme.text }]}>30 min</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 12,
  },
})