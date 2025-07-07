import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import SemesterItem from '@/components/SemesterItem'
import { semesters } from '@/data/data'
import PressableOpacity from '@/components/PressableOpacity'

export default function SelectSemester() {
  const theme = useTheme()

  function handleSetSemester(name: string) {
    router.replace({ pathname: './(tabs)/(courses)', params: { semesterName: name } })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerText, { color: theme.text }]}>Select Semester</Text>
        <PressableOpacity onPress={() => router.push('/semester-form')}>
          <SymbolView name='plus' tintColor={theme.text} />
        </PressableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {semesters.map(item => (
          <SemesterItem
            key={item.id}
            item={item}
            onSelect={({ name }) => {
              handleSetSemester(name)
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
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
  },
  listContainer: {
    gap: 16,
    paddingBottom: 24,
  },
})