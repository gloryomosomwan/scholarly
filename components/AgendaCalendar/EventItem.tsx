import { StyleSheet, View } from 'react-native'
import React from 'react'
import { isBefore, isSameDay } from 'date-fns';

import TimeRange from '@/components/EventItem/TimeRange';
import Divider from '@/components/EventItem/Divider';
import EventHeader from '@/components/EventItem/EventHeader';
import EventItemLocation from '@/components/EventItem/EventItemLocation';
import EventItemCourseText from '@/components/EventItem/EventItemCourseText';

import { useTheme } from '@/hooks';
import { Event } from '@/types';
import { getCourseById } from '@/hooks/useDatabase';

type EventItemProps = {
  event: Event
}

export default function EventItem({ event }: EventItemProps) {
  const theme = useTheme()
  const today = new Date()
  const course = getCourseById(event.courseID ?? null)
  const eventWasEarlierToday = isSameDay(event.startDate, today) && isBefore(event.endDate, Date.now())
  return (
    <View style={styles.container}>
      <TimeRange startDate={event.startDate} endDate={event.endDate} eventWasEarlierToday={eventWasEarlierToday} />
      <Divider startDate={event.startDate} endDate={event.endDate} eventWasEarlierToday={eventWasEarlierToday} courseColor={course ? course.color : theme.accent} />
      <View style={styles.eventDetailsContainer}>
        {course && <EventItemCourseText courseCode={course.code} courseColor={course.color} />}
        <EventHeader text={course ? event.type : event.name} eventWasEarlierToday={eventWasEarlierToday} hasCourse={course !== null} />
        <EventItemLocation courseColor={course ? course.color : theme.accent} location={event.location} eventWasEarlierToday={eventWasEarlierToday} />
      </View>
    </View>
  )
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