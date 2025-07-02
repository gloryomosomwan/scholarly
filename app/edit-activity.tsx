import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

import { useTheme } from '@/utils/useTheme'
import { SymbolView } from 'expo-symbols'

export default function editActivity() {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <TextInput
        placeholder="Enter title"
        style={[styles.titleInput, { color: theme.text }]}
        placeholderTextColor={theme.grey500}
      />
      <View style={styles.detailRow}>
        <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.detailText, { color: theme.grey500 }]}>Add due date</Text>
      </View>
      <View style={styles.detailRow}>
        <SymbolView name={'bookmark'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.detailText, { color: theme.grey500 }]}>Add course</Text>
      </View>
      <View style={styles.detailRow}>
        <SymbolView name={'flag'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.detailText, { color: theme.grey500 }]}>Add priority</Text>
      </View>
      <View style={styles.detailRow}>
        <SymbolView name={'note.text'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.detailText, { color: theme.grey500 }]}>Add notes</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 24
  },
  titleInput: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
  },
})