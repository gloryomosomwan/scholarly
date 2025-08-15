import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'
import { getCourseById } from '@/hooks/database'

type FilterPillProps = {
  filterValue: string | null
  clear: () => void
}

export default function FilterPill({ filterValue, clear }: FilterPillProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.pill, { backgroundColor: theme.grey100 }]}>
        <Text style={[styles.text, { color: theme.text }]}>Filtered by: {getCourseById(Number(filterValue))?.code}</Text>
      </View>
      <Pressable style={[styles.clearContainer, { backgroundColor: theme.grey100 }]} onPress={clear}>
        <Text style={[styles.clearText, { color: theme.text }]}>X</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5
  },
  pill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  text: {
    fontWeight: '600'
  },
  clearContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  clearText: {
    fontWeight: '600'
  },
})