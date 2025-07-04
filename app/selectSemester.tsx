import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import { useTheme } from '@/hooks'
import SemesterItem from '@/components/SemesterItem'
import { semesters } from '@/data/data'

export default function SelectSemester() {
  const theme = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text style={[styles.header, { color: theme.text }]}>Select Semester</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {semesters.map(item => (
          <SemesterItem
            key={item.id}
            item={item}
            onPress={() => {
              /* handle select */
            }}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  listContainer: {
    gap: 16,
    paddingBottom: 24,
  },
})