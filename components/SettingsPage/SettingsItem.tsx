import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SFSymbol, SymbolView } from 'expo-symbols'
import { Href, router } from 'expo-router'

import { useTheme } from '@/hooks'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

type SettingsItemProps = {
  title: string
  icon: SFSymbol
  route: Href
}

export default function SettingsItem({ title, icon, route }: SettingsItemProps) {
  const theme = useTheme()
  return (
    <PressableOpacity onPress={() => router.navigate(route)} style={[styles.container, {}]}>
      <View style={[styles.leftSide, {}]}>
        <SymbolView style={styles.icon} name={icon} />
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
