import { StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { isAfter, isSameDay } from 'date-fns';

import EventItemTimeRange from '@/components/EventItem/EventItemTimeRange';
import EventItemDivider from '@/components/EventItem/EventItemDivider';
import EventItemHeader from '@/components/EventItem/EventItemHeader';
import EventItemLocation from '@/components/EventItem/EventItemLocation';
import EventItemCourseText from '@/components/EventItem/EventItemCourseText';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

import { useTheme } from '@/hooks';
import { Event } from '@/types';
import { getCourseById } from '@/hooks/useDatabase';
import { useCalendarStore } from '@/stores/calendar';

type EventItemProps = {
  event: Event;
}

export default function EventItem({ event }: EventItemProps) {
  const theme = useTheme()
  const course = getCourseById(event.courseID ?? null)
  const { currentDate } = useCalendarStore()
  const today = new Date()
  const eventWasEarlierToday = isSameDay(currentDate, today) ? checkEventWasEarlierToday(event.startDate, event.endDate) : false
  return (
    <PressableOpacity style={styles.container} onPress={() => router.navigate({ pathname: '/event-form', params: { id: event.id } })}>
      <EventItemTimeRange start={event.startDate} end={event.endDate} eventWasEarlierToday={eventWasEarlierToday} />
      <EventItemDivider startDate={event.startDate} endDate={event.endDate} eventWasEarlierToday={eventWasEarlierToday} courseColor={course ? course.color : theme.accent} />
      <View style={styles.eventDetailsContainer}>
        {course && <EventItemCourseText courseCode={course.code} courseColor={course.color} eventWasEarlierToday={eventWasEarlierToday} />}
        <EventItemHeader eventType={event.type} eventName={event.name} eventWasEarlierToday={eventWasEarlierToday} hasCourse={course !== null} />
        {
          event.location &&
          <EventItemLocation courseColor={course ? course.color : theme.accent} location={event.location} eventWasEarlierToday={eventWasEarlierToday} />
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