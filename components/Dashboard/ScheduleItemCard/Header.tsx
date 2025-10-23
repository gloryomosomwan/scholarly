import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type HeaderProps = {
  text: string | undefined
  courseColor: string | undefined
}

export default function Header({ text, courseColor }: HeaderProps) {
  const theme = useTheme()
  const eventHasCourse: boolean = courseColor !== undefined
  if (eventHasCourse) text = text?.replace(/\w/, c => c.toUpperCase())
  return (
    <View style={styles.container}>
      {eventHasCourse && <SymbolView name={'book'} size={28} tintColor={courseColor} style={[styles.icon]} />}
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    // marginBottom: 4,
  },
  icon: {
    marginRight: 5
  },
})