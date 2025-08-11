import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useTheme } from '@/hooks'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

export default function Header() {
  const theme = useTheme()
  const { semesterName } = useLocalSearchParams<{ semesterName: string }>()
  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
      {/* Top Row */}
      <View style={styles.headerTopContainer}>
        <View style={styles.semesterInfoContainer}>
          <Text style={[styles.semesterText, { color: theme.text }]}>{semesterName}</Text>
        </View>
        <PressableOpacity onPress={() => router.navigate('/select-semester')}>
          <SymbolView name="calendar" size={35} tintColor={theme.text} />
        </PressableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 24,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  headerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  semesterText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  semesterInfoContainer: {
    flex: 1,
  },
})