import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedValue } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { isSameDay } from 'date-fns';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import Event from "@/components/AgendaCalendar/Event";
import { events, assignments, tasks } from '@/utils/data'
import { useTheme } from '@/utils/useTheme'
import { useCalendar } from './CalendarContext';
import { compareEventTimes, compareActivityTimes } from '@/utils/Calendar/utils';
import ActivityCard from '../ActivityCard';

type AgendaProps = {
  bottomSheetTranslationY: SharedValue<number>
}

export default function Agenda({ bottomSheetTranslationY }: AgendaProps) {
  const insets = useSafeAreaInsets()
  let paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const initialCalendarBottom = (47 * 6) + paddingTop + 52
  const { height } = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight()
  const snapPoints = useMemo(() => [height - initialCalendarBottom - bottomTabBarHeight, height - initialCalendarBottom + 235 - bottomTabBarHeight], []);
  const theme = useTheme()
  const { calendarState } = useCalendar()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)

  const currentEvents = events.filter((event) => isSameDay(event.start, calendarState.currentDate))
  currentEvents.sort(compareEventTimes)
  const currentEventElements = currentEvents.map(event => <Event key={event.id} event={event} />)

  const isActivityCurrent = (activity: any) => {
    if (activity.due) {
      if (isSameDay(activity.due, calendarState.currentDate)) {
        return true
      }
    }
    return false
  }
  const currentAssignments = assignments.filter(isActivityCurrent)
  currentAssignments.sort(compareActivityTimes)
  const currentAssignmentElements = currentAssignments.map(assignment => <ActivityCard key={assignment.id} activity={assignment} />)

  const currentTasks = tasks.filter(isActivityCurrent)
  currentTasks.sort(compareActivityTimes)
  const currentTaskElements = currentTasks.map(task => <ActivityCard key={task.id} activity={task} />)

  useEffect(() => {
    const unsubscribe = calendarState.weekSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = calendarState.monthSubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const dayUnsubscribe = calendarState.daySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return dayUnsubscribe
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      setSelectedDate(calendarState.currentDate)
    })
    return todayUnsubscribe
  }, [])

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
          {currentEvents.length > 0 ? currentEventElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No events"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Assignments"}</Text>
          {currentAssignments.length > 0 ? currentAssignmentElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No assignments"}</Text>}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionHeadingText, { color: theme.text }]}>{"Tasks"}</Text>
          {currentTasks.length > 0 ? currentTaskElements : <Text style={[styles.placeholderText, { color: theme.grey400 }]} >{"No tasks"}</Text>}
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