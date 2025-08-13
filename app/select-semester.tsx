import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SemesterItem from '@/components/SemesterSelector/SemesterItem'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'
import { useSemesters } from '@/hooks/database'

export default function SelectSemester() {
  const theme = useTheme()
  const semesters = useSemesters()

  const selectSemester = async (id: string) => {
    try {
      await AsyncStorage.setItem('semester', id);
    } catch (e) {
      // saving error
    }
  };

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
              selectSemester(item.id.toString())
              router.back()
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