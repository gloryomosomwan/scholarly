import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type HeaderProps = {
  courseColor: string | undefined
  hasCourse: boolean
  isCourseEvent: boolean
  title: string | undefined
  type: string
}

export default function Header({ courseColor, isCourseEvent, title, type, hasCourse }: HeaderProps) {
  const theme = useTheme()
  let text;
  if (isCourseEvent) text = type.replace(/\w/, c => c.toUpperCase())
  else text = title || '(No title)'
  return (
    <View style={styles.container}>
      {hasCourse && <SymbolView name={'book'} size={28} tintColor={courseColor} style={[styles.icon]} />}
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