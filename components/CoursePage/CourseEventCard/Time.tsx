import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type TimeProps = {
  start: Date
  end: Date
}

export default function Time({ start, end }: TimeProps) {
  const theme = useTheme()
  return (
    <View style={styles.detailRow}>
      <SymbolView name="clock" size={16} tintColor={theme.grey600} />
      <Text style={[styles.detailText, { color: theme.grey600 }]}>{`${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} - ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
    marginLeft: 10
  },
})