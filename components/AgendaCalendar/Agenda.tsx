import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import EventItem from "@/components/AgendaCalendar/EventItem";
import TaskCard from '@/components/Task/TaskCard';
import AssignmentCard from '@/components/Assignment/AssignmentCard';

import { useTheme } from '@/hooks'
import { useCalendarStore } from '@/stores/CalendarState';
import { useAssignmentsByDay, useEventsByDay, useTasksByDay } from '@/hooks/useDatabase';
import { sortAssignmentsByDay, sortEventsByDay } from '@/utils/sort';

type AgendaProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function Agenda({ bottomSheetTranslationY }: AgendaProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top

  const { currentDate } = useCalendarStore()
  const initialCalendarBottom = (47 * 6) + paddingTop + 52
  const { height } = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight()
  const snapPoints = useMemo(() => [height - initialCalendarBottom - bottomTabBarHeight, height - initialCalendarBottom + 235 - bottomTabBarHeight], []);

  const events = useEventsByDay(currentDate)
  events.sort(sortEventsByDay)
  const eventElements = useMemo(() => {
    return events.map(event => <EventItem key={event.id} event={event} />);
  }, [events]); // Does useMemo help here?
  const assignments = useAssignmentsByDay(currentDate)
  assignments.sort(sortAssignmentsByDay)
  const assignmentElements = assignments.map(assignment => <AssignmentCard key={assignment.id} assignment={assignment} />)
  const tasks = useTasksByDay(currentDate)
  const taskElements = tasks.map(task => <TaskCard key={task.id} task={task} />)

  return (
    <BottomSheet
      // index={1}
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
          {events.length > 0 ? eventElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No events"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Assignments"}</Text>
          {assignmentElements.length > 0 ? assignmentElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No assignments"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Tasks"}</Text>
          {tasks.length > 0 ? taskElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No tasks"}</Text>}
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