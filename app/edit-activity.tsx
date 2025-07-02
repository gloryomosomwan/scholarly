import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

import { useTheme } from '@/utils/useTheme'
import { SymbolView } from 'expo-symbols'

export default function editActivity() {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={styles.formContainer}>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={[styles.buttonText, { color: theme.accent }]}>Mark completed</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.buttonText, { color: theme.dangerText }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  formContainer: {
    gap: 24,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
})