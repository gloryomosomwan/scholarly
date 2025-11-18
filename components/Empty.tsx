import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SFSymbol, SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type EmptyProps = {
  icon: SFSymbol
  text: string
}

export default function Empty({ icon, text }: EmptyProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <SymbolView style={[styles.icon, {}]} name={icon} size={85} tintColor={theme.grey200} />
      <Text style={[styles.headerText, { color: theme.grey300 }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 35
  },
  headerText: {
    fontSize: 15
  },
  icon: {
    height: 90
  }
})