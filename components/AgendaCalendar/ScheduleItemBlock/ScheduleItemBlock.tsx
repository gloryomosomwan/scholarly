import { StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { isAfter, isSameDay } from 'date-fns';

import ScheduleItemTimeRange from '@/components/AgendaCalendar/ScheduleItemBlock/TimeRange';
import ScheduleItemDivider from '@/components/AgendaCalendar/ScheduleItemBlock/Divider';
import ScheduleItemHeader from '@/components/AgendaCalendar/ScheduleItemBlock/Header';
import ScheduleItemLocation from '@/components/AgendaCalendar/ScheduleItemBlock/Location';
import ScheduleItemCourseText from '@/components/AgendaCalendar/ScheduleItemBlock/CourseText';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

import { useTheme } from '@/hooks';
import { Event, Test } from '@/types';
import { getCourseById } from '@/hooks/useDatabase';
import { useCalendarStore } from '@/stores/calendar';

type ScheduleItemBlockProps = {
  event: Event | Test;
}

export default function ScheduleItemBlock({ event }: ScheduleItemBlockProps) {
  const theme = useTheme()
  const course = getCourseById(event.courseID ?? null)
  const { currentDate } = useCalendarStore()
  const today = new Date()
  const eventWasEarlierToday = isSameDay(currentDate, today) ? checkEventWasEarlierToday(event.startDate, event.endDate) : false
  const params = { id: event.id, itemType: event.type === 'test' ? 'test' : 'event' }
  return (
    <PressableOpacity style={styles.container} onPress={() => router.navigate({ pathname: '/schedule-item-details', params: params })}>
      <ScheduleItemTimeRange start={event.startDate} end={event.endDate} eventWasEarlierToday={eventWasEarlierToday} />
      <ScheduleItemDivider startDate={event.startDate} endDate={event.endDate} eventWasEarlierToday={eventWasEarlierToday} courseColor={course ? course.color : theme.accent} />
      <View style={styles.eventDetailsContainer}>
        {course && <ScheduleItemCourseText courseCode={course.code} courseColor={course.color} eventWasEarlierToday={eventWasEarlierToday} eventType={event.type} />}
        <ScheduleItemHeader eventType={event.type} eventName={event.name} eventWasEarlierToday={eventWasEarlierToday} hasCourse={course !== null} courseColor={course ? course.color : theme.accent} />
        {
          event.location &&
          <ScheduleItemLocation courseColor={course ? course.color : theme.accent} location={event.location} eventWasEarlierToday={eventWasEarlierToday} />
        }
      </View>
    </PressableOpacity>
  )
}

const checkEventWasEarlierToday = (startDate: Date, endDate: Date): boolean => {
  const today = new Date()
  return (isSameDay(startDate, today) || isSameDay(endDate, today)) && isAfter(Date.now(), endDate)
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    marginVertical: 5
  },
  eventDetailsContainer: {
    justifyContent: 'flex-start',
    gap: 3,
    marginLeft: 4
  },
})