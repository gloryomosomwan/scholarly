import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { useState } from 'react';

import ActivityCard from '@/components/Activity/ActivityCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import TaskSortMenu from '@/components/Menus/TaskSortMenu';
import TaskFilterMenu from '@/components/Menus/TaskFilterMenu';

import { useTheme } from '@/hooks/useTheme';
import { getCourseById, useTasks } from '@/hooks/database';
import { Activity, PriorityOption, TaskSortOption, TaskFilterOption } from '@/types';

export default function Tab() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  const [sortBy, setSortBy] = useState<TaskSortOption | null>(null)
  const [filterBy, setFilterBy] = useState<TaskFilterOption | null>(null)
  const [filterValue, setFilterValue] = useState<string | null>(null)
  const taskData = useTasks()

  const filteredTaskData = filterTasks(taskData, filterBy, filterValue)
  const sortedTaskData = sortTasks(filteredTaskData, sortBy)

  const handleSortBy = (sortBy: TaskSortOption) => {
    setSortBy(sortBy)
  }

  const handleSetFilterBy = (filterBy: TaskFilterOption) => {
    setFilterBy(filterBy)
  }

  const handleSetFilterValue = (filterValue: string) => {
    setFilterValue(filterValue)
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Tasks</Text>
        <View style={styles.buttonsContainer}>
          <PressableOpacity style={styles.buttonContainer} onPress={() => router.navigate('/activity-form')} testID='add task button'>
            <SymbolView name='plus' />
          </PressableOpacity>
          <PressableOpacity style={styles.buttonContainer}>
            <TaskFilterMenu filterBy={filterBy} filterValue={filterValue} handleSetFilterBy={handleSetFilterBy} handleSetFilterValue={handleSetFilterValue} />
          </PressableOpacity>
          <PressableOpacity style={styles.buttonContainer}>
            <TaskSortMenu sortBy={sortBy} handleSelection={handleSortBy} />
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
            {/* Clear Button */}
            <Pressable style={[styles.clearSelectionContainer, { backgroundColor: theme.grey100 }]} onPress={() => {
              setFilterBy(null)
              setFilterValue(null)
            }}>
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
            {/* Clear Button */}
            <Pressable style={[styles.clearSelectionContainer, { backgroundColor: theme.grey100 }]} onPress={() => setSortBy(null)}>
              <Text style={[styles.clearSelectionText, { color: theme.text }]}>X</Text>
            </Pressable>
          </View>
        }
      </View>
      <ScrollView style={[styles.tasksContainer, {}]} contentInsetAdjustmentBehavior="automatic">
        {sortedTaskData.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
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

function sortTasks(tasks: Array<Activity>, sortBy: TaskSortOption | null) {
  if (!sortBy) return tasks
  // Filter out the tasks that don't have a course or priority
  const sortableTasks = tasks.filter((task): task is Activity & { courseID: number, priority: PriorityOption } => {
    return task.courseID !== undefined && task.priority !== undefined
  })

  return [...sortableTasks].sort((a, b) => {
    switch (sortBy) {
      case 'Course': {
        const courseAName = getCourseById(a.courseID)?.name || ''
        const courseBName = getCourseById(b.courseID)?.name || ''
        return courseAName?.localeCompare(courseBName)
      }
      case 'Priority': {
        const priorityMap = { 'low': 0, 'medium': 1, 'high': 2 }
        if (priorityMap[a.priority] > priorityMap[b.priority]) return -1
        else if (priorityMap[b.priority] > priorityMap[a.priority]) return 1
        else return 0
      }
    }
  })
}

function filterTasks(tasks: Array<Activity>, filterBy: TaskFilterOption | null, filterValue: string | null) {
  if (!filterBy || !filterValue) return tasks
  return [...tasks].filter((task) => {
    switch (filterBy) {
      case 'Course':
        if (task.courseID) {
          const courseName = getCourseById(task.courseID)?.name
          return courseName === filterValue
        }
        else {
          return false
        }
      case 'Priority':
        return task.priority === filterValue
    }
  })
}