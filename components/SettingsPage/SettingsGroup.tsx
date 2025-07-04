import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'
import SettingsItem from './SettingsItem'

type SettingsGroupProps = {
  title: string
}

export default function SettingsGroup({ title }: SettingsGroupProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container]}>
      <Text style={[styles.headerText, { color: theme.grey400 }]}>{title}</Text>
      <View style={[styles.body, { backgroundColor: theme.secondary }]}>
        <SettingsItem title={'A setting!'} />
        <SettingsItem title={'A setting!'} />
        <SettingsItem title={'A setting!'} />
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