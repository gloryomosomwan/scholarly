import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { like } from 'drizzle-orm';

import ActivityCard from '@/components/Activity/ActivityCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import TaskSortMenu from '@/components/Menus/TaskSortMenu';
import TaskFilterMenu from '@/components/Menus/TaskFilterMenu';
import { useTheme } from '@/hooks';

import { tasks } from '@/db/schema';
import { db } from '@/db/init';
import { toActivity } from '@/utils/database';

export default function Tab() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [filterBy, setFilterBy] = useState<string | null>(null)

  // timezone bug
  const todayPattern = new Date().toISOString().slice(0, 10) + '%';
  const { data } = useLiveQuery(db.select().from(tasks).where(like(tasks.due, todayPattern)))
  const activityData = data.map(toActivity)

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy)
  }

  const handleFilterBy = (filterBy: string) => {
    setFilterBy(filterBy)
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Tasks</Text>
        <View style={styles.buttonsContainer}>
          <PressableOpacity style={styles.buttonContainer}>
            <TaskFilterMenu handleSelection={handleFilterBy} />
          </PressableOpacity>
          <PressableOpacity style={styles.buttonContainer}>
            <TaskSortMenu handleSelection={handleSortBy} />
          </PressableOpacity>
        </View>
      </View>
      <View style={[styles.selectionsContainer]}>
        {
          filterBy &&
          <View style={[styles.selectionContainer, {}]}>
            <View style={[styles.selectionPill, { backgroundColor: theme.grey100 }]}>
              <Text style={[styles.selectionText, { color: theme.text }]}>Filtered by: {filterBy}</Text>
            </View>
            <Pressable style={[styles.clearSelectionContainer, { backgroundColor: theme.grey100 }]} onPress={() => setFilterBy(null)}>
              <Text style={[styles.clearSelectionText, { color: theme.text }]}>X</Text>
            </Pressable>
          </View>
        }
        {
          sortBy &&
          <View style={[styles.selectionContainer, {}]}>
            <View style={[styles.selectionPill, { backgroundColor: theme.grey100 }]}>
              <Text style={[styles.selectionText, { color: theme.text }]}>Sorted by: {sortBy}</Text>
            </View>
            <Pressable style={[styles.clearSelectionContainer, { backgroundColor: theme.grey100 }]} onPress={() => setSortBy(null)}>
              <Text style={[styles.clearSelectionText, { color: theme.text }]}>X</Text>
            </Pressable>
          </View>
        }
      </View>
      <ScrollView style={[styles.tasksContainer, {}]} contentInsetAdjustmentBehavior="automatic">
        {activityData.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  headerText: {
    fontSize: 45,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  tasksContainer: {
    paddingHorizontal: 20,
  },
  selectionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10
  },
  selectionContainer: {
    flexDirection: 'row',
    gap: 5
  },
  selectionPill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  selectionText: {
    fontWeight: '600'
  },
  clearSelectionContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  clearSelectionText: {
    fontWeight: '600'
  },
});