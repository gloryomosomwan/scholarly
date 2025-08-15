import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { useState } from 'react';

import ActivityCard from '@/components/Activity/ActivityCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import TaskSortMenu from '@/components/TasksPage/TaskSortMenu';
import TaskFilterMenu from '@/components/TasksPage/TaskFilterMenu';
import FilterPill from '@/components/TasksPage/FilterPill';
import SortPill from '@/components/TasksPage/SortPill';

import { useTheme } from '@/hooks/useTheme';
import { useCourses, useTasks } from '@/hooks/database';
import { Activity, PriorityOption, TaskSortOption, TaskFilterOption, Course } from '@/types';

export default function Tab() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  const [sortBy, setSortBy] = useState<TaskSortOption | null>(null)
  const [filterBy, setFilterBy] = useState<TaskFilterOption | null>(null)
  const [filterValue, setFilterValue] = useState<string | null>(null)
  let taskData = useTasks()
  const courses = useCourses()

  if (filterValue && filterBy) taskData = filterTasks(taskData, filterBy, filterValue, courses)
  if (sortBy) taskData = sortTasks(taskData, sortBy, courses)

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
          <TaskFilterMenu filterValue={filterValue} handleSetFilterBy={handleSetFilterBy} handleSetFilterValue={handleSetFilterValue} />
          <TaskSortMenu sortBy={sortBy} handleSelection={handleSortBy} />
        </View>
      </View>
      <View style={[styles.pillContainer]}>
        {
          filterBy &&
          <FilterPill filterValue={filterValue} clear={() => { setFilterBy(null); setFilterValue(null) }} />
        }
        {
          sortBy &&
          <SortPill sortBy={sortBy} clear={() => setSortBy(null)} />
        }
      </View>
      <ScrollView style={[styles.tasksContainer, {}]} contentInsetAdjustmentBehavior="automatic">
        {taskData.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
      </ScrollView>
    </View>
  );
}

function sortTasks(tasks: Array<Activity>, sortBy: TaskSortOption | null, courses: Array<Course>) {
  // Filter out the tasks that don't have a course or priority
  const sortableTasks = tasks.filter((task): task is Activity & { courseID: number, priority: PriorityOption } => {
    return task.courseID !== undefined && task.priority !== undefined
  })
  const courseMap = new Map()
  for (let course of courses) {
    courseMap.set(course.id, course.code)
  }
  return [...sortableTasks].sort((a, b) => {
    switch (sortBy) {
      case 'Course': {
        const courseACode = courseMap.get(a.courseID) || ''
        const courseBCode = courseMap.get(b.courseID) || ''
        return courseACode?.localeCompare(courseBCode)
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

function filterTasks(tasks: Array<Activity>, filterBy: TaskFilterOption | null, filterValue: string | null, courses: Array<Course>) {
  return [...tasks].filter((task) => {
    switch (filterBy) {
      case 'Course':
        if (task.courseID) {
          return task.courseID.toString() === filterValue
        }
        else {
          return false
        }
      case 'Priority':
        return task.priority === filterValue
    }
  })
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
  pillContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10
  },
});
