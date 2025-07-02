import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/utils/useTheme'

export default function editActivity() {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text>Task</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})