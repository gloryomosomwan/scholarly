import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '../PressableOpacity'

type SettingsItemProps = {
  title: string
}

export default function SettingsItem({ title }: SettingsItemProps) {
  const theme = useTheme()
  return (
    <PressableOpacity onPress={() => alert('hello')} style={[styles.container, {}]}>
      <View style={[styles.leftSide, {}]}>
        <SymbolView style={styles.icon} name={'bolt.shield'} />
        <Text style={[styles.text, { color: theme.text }]}>{title}</Text>
      </View>
      <SymbolView name={'chevron.right'} size={15} tintColor={theme.grey400} />
    </PressableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  body: {},
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: '500',
    fontSize: 16
  },
})
