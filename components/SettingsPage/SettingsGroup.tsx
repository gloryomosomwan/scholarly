import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'

type SettingsGroupProps = {
  title: string
  children: React.ReactNode
}

export default function SettingsGroup({ title, children }: SettingsGroupProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container]}>
      <Text style={[styles.headerText, { color: theme.grey400 }]}>{title}</Text>
      <View style={[styles.body, { backgroundColor: theme.secondary }]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  body: {
    borderRadius: 12,
  },
  headerText: {
    left: 15,
    marginBottom: 5,
  },
})