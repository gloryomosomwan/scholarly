import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import { getColorWithOpacity } from '@/utils'

export default function AddCourseButton() {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: theme.secondary, borderColor: theme.grey400 }]} onPress={() => { router.navigate('/course-form') }}>
        <View style={styles.contentContainer}>
          <View style={[styles.iconContainer, { backgroundColor: getColorWithOpacity(theme.accent, 0.05) }]}>
            <SymbolView name="plus" size={20} tintColor={theme.accent} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: theme.text }]}>Add Course</Text>
            <Text style={[styles.subtitleText, { color: theme.grey500 }]}>Enroll in a new course</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  buttonContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 14,
  },
})