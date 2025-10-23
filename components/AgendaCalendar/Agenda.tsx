import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import ScheduleItem from "@/components/AgendaCalendar/ScheduleItemBlock/ScheduleItemBlock";
import TaskCard from '@/components/TaskCard/TaskCard';
import AssignmentCard from '@/components/Assignment/AssignmentCard';
import ScheduleItemBar from '@/components/Dashboard/ScheduleItemCard/ScheduleItemBar';

import { useTheme } from '@/hooks'
import { useCalendarStore } from '@/stores/calendar';
import { useAssignmentsByDay, useEventsByDay, useTasksByDay, useTestsByDay } from '@/hooks/useDatabase';
import { sortAssignmentsByDue, sortScheduleItems, sortTasksByDue } from '@/utils/sort';
import { getEventClass } from '@/utils/event';

type AgendaProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function Agenda({ bottomSheetTranslationY }: AgendaProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const initialCalendarBottom = (47 * 6) + paddingTop + 52

  const { currentDate } = useCalendarStore()

  const { height } = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight()
  const snapPoints = useMemo(() => [height - initialCalendarBottom - bottomTabBarHeight, height - initialCalendarBottom + 235 - bottomTabBarHeight], []);

  const events = useEventsByDay(currentDate)
  const tests = useTestsByDay(currentDate)
  const scheduleItems = [...events, ...tests]
  scheduleItems.sort(sortScheduleItems)
  const scheduleElements = scheduleItems.map((item) => {
    const itemClass = getEventClass(item.startDate, item.endDate)
    if (itemClass === 'regular' || itemClass === 'crossover') return <ScheduleItem key={`${item.id}.${item.startDate}`} event={item} />
    // else return <EventBar key={`${item.id}.${item.startDate}`} event={event} date={currentDate} />
  })

  const assignments = useAssignmentsByDay(currentDate)
  assignments.sort(sortAssignmentsByDue)
  const assignmentElements = assignments.map(assignment => <AssignmentCard key={assignment.id} assignment={assignment} />)
  const tasks = useTasksByDay(currentDate)
  tasks.sort(sortTasksByDue)
  const taskElements = tasks.map(task => <TaskCard key={task.id} task={task} />)

  return (
    <BottomSheet
      index={1}
      snapPoints={snapPoints}
      animatedPosition={bottomSheetTranslationY}
      enableOverDrag={false}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: theme.primary }}
      animateOnMount={false}
      // enableContentPanningGesture={false}
      style={styles.bottomSheet}
      handleStyle={[styles.handleStyle, { backgroundColor: theme.primary }]}
      handleIndicatorStyle={{ backgroundColor: theme.grey400 }}
    >
      <BottomSheetScrollView style={{ backgroundColor: theme.primary }}>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Schedule"}</Text>
          {scheduleElements.length > 0 ? scheduleElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No events"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Assignments"}</Text>
          {assignmentElements.length > 0 ? assignmentElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No assignments"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Tasks"}</Text>
          {taskElements.length > 0 ? taskElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No tasks"}</Text>}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    zIndex: 3,
  },
  handleStyle: {
    borderRadius: 25,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionHeadingText: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '400'
  }
})