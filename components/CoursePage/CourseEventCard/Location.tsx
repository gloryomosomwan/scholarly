import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type LocationProps = {
  location: string
}

export default function Location({ location }: LocationProps) {
  const theme = useTheme()
  return (
    <View style={styles.detailRow}>
      <SymbolView name="mappin.circle.fill" size={16} tintColor={theme.grey600} />
      <Text style={[styles.detailText, { color: theme.grey600 }]}>{location}</Text>
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