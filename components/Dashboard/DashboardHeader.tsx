import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

export default function DashboardHeader() {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <View style={styles.greetingDateContainer}>
        <Text style={[styles.greetingText, { color: theme.text }]}>Good morning, Glory 👋</Text>
        <Text style={[styles.dateText, { color: theme.grey400 }]}>{dayjs().format('dddd, MMMM D')}</Text>
      </View>
      <SymbolView style={styles.icon} name={'person.crop.circle.fill'} size={45} tintColor={theme.grey400} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingText: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: '600'
  },
  dateText: {
    fontSize: 20,
    marginBottom: 25,
    fontWeight: '600',
  },
  greetingDateContainer: {
    maxWidth: '80%',
  },
  icon: {
    right: 10,
  },
})