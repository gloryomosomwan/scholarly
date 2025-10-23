import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type LocationProps = {
  location: string | undefined
  courseColor: string | undefined
}

export default function Location({ location, courseColor }: LocationProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <SymbolView style={styles.icon} name={'mappin.circle.fill'} tintColor={courseColor ?? theme.grey400} size={15} />
      <Text style={[styles.text, { color: theme.grey500 }]}>{location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 4,
    opacity: 0.7
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
})