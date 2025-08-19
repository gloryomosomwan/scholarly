import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type EventHeaderProps = {
  courseCode: string | undefined
  courseColor: string | undefined
}

export default function EventHeader({ courseCode, courseColor }: EventHeaderProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <SymbolView name={'book'} size={28} tintColor={courseColor} style={[styles.icon]} />
      <Text style={[styles.text, { color: theme.text }]}>{courseCode}</Text>
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