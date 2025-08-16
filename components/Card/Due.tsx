import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'

type DueProps = {
  due: Date
}

export default function Due({ due }: DueProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <SymbolView name="calendar" size={15} tintColor={theme.grey500} />
        <Text style={[styles.text, { color: theme.grey600 }]}>{format(due, 'MMM d')}</Text>
      </View>
      <View style={styles.timeContainer}>
        <SymbolView name="clock" size={15} tintColor={theme.grey500} />
        <Text style={[styles.text, { color: theme.grey600 }]}>{format(due, 'h:mm a')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 5
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 5
  },
  text: {
    fontSize: 13
  }
})