import { View, Text, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { tasks } from '@/db/schema';

import ActivityCard from '@/components/Activity/ActivityCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import TaskSortMenu from '@/components/Menus/TaskSortMenu';
import TaskFilterMenu from '@/components/Menus/TaskFilterMenu';
import { useTheme } from '@/hooks';
import { Activity } from '@/types';

export default function Tab() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [filterBy, setFilterBy] = useState<string | null>(null)
  // const [tasks, setTasks] = useState<Activity[] | []>([])

  const expo = useSQLiteContext()
  // const tasks = expo.getAllSync<Activity>('SELECT * FROM tasks')
  // const expo = openDatabaseSync("db.db");
  const db = drizzle(expo);
  const data = db.select().from(tasks).all()

  async function addTask() {
    // const lol = await db.select().from(tasks);
    // console.log(lol[0].title)
    // const result = await db.runAsync(
    //   `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL);
    //    INSERT INTO tasks (title) VALUES ('Buy textbooks');`
    // )
    // await db.runAsync(`INSERT INTO tasks (title) VALUES ('buy')`)
    // console.log(result.lastInsertRowId, result.changes)
  }

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
        {data.map((task) => <ActivityCard key={task.id} activity={task} />)}
        <Button title='Add Task' onPress={addTask} />
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