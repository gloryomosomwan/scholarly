import { StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { isAfter, isSameDay } from 'date-fns';

import { useTheme } from '@/hooks';
import { Event, Test } from '@/types';
import { getCourseById } from '@/hooks/useDatabase';
import { useCalendarStore } from '@/stores/calendar';

import TimeRange from '@/components/AgendaCalendar/ScheduleItemBlock/TimeRange';
import Divider from '@/components/AgendaCalendar/ScheduleItemBlock/Divider';
import Header from '@/components/AgendaCalendar/ScheduleItemBlock/Header';
import Location from '@/components/AgendaCalendar/ScheduleItemBlock/Location';
import CourseText from '@/components/AgendaCalendar/ScheduleItemBlock/CourseText';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

type ScheduleItemBlockProps = {
  item: Event | Test;
}

export default function ScheduleItemBlock({ item }: ScheduleItemBlockProps) {
  const theme = useTheme()
  const course = getCourseById(item.courseID ?? null)
  const { currentDate } = useCalendarStore()
  const today = new Date()
  const itemHasOccurred = isSameDay(currentDate, today) ? checkItemHasOccurred(item.startDate, item.endDate) : false
  const params = { id: item.id, itemType: item.type === 'test' ? 'test' : 'event' }
  return (
    <PressableOpacity style={styles.container} onPress={() => router.navigate({ pathname: '/schedule-item-details', params: params })}>
      <TimeRange start={item.startDate} end={item.endDate} itemHasOccurred={itemHasOccurred} />
      <Divider startDate={item.startDate} endDate={item.endDate} itemHasOccurred={itemHasOccurred} courseColor={course ? course.color : theme.accent} />
      <View style={styles.eventDetailsContainer}>
        {course && <CourseText courseCode={course.code} courseColor={course.color} itemHasOccurred={itemHasOccurred} itemType={item.type} />}
        <Header itemType={item.type} itemName={item.name} itemHasOccurred={itemHasOccurred} hasCourse={course !== null} courseColor={course ? course.color : theme.accent} />
        {
          item.location &&
          <Location courseColor={course ? course.color : theme.accent} location={item.location} itemHasOccurred={itemHasOccurred} />
        }
      </View>
    </PressableOpacity>
  )
}

const checkItemHasOccurred = (startDate: Date, endDate: Date): boolean => {
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