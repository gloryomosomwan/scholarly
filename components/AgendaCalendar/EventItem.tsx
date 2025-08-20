import { StyleSheet, View } from 'react-native'
import React from 'react'
import { isBefore, isSameDay } from 'date-fns';

import TimeRange from '@/components/EventItem/TimeRange';
import Divider from '@/components/EventItem/Divider';
import EventHeader from '@/components/EventItem/EventHeader';
import EventItemLocation from '@/components/EventItem/EventItemLocation';

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
  const courseColor = theme.accent
  const eventHasCourse = course !== null

  const eventWasEarlierToday = (() => {
    if (isSameDay(event.startDate, today) && isBefore(event.endDate, Date.now())) {
      return true
    }
    return false
  })()

  return (
    <View style={styles.container}>
      <TimeRange startDate={event.startDate} endDate={event.endDate} eventWasEarlierToday={eventWasEarlierToday} />
      <Divider startDate={event.startDate} endDate={event.endDate} eventWasEarlierToday={eventWasEarlierToday} courseColor={courseColor} />
      <View style={styles.courseDetailsContainer}>
        <EventHeader text={'lol'} eventWasEarlierToday={eventWasEarlierToday} />
        <EventItemLocation courseColor={courseColor} location={event.location} eventWasEarlierToday={eventWasEarlierToday} />
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
  courseDetailsContainer: {
    justifyContent: 'space-between',
    marginLeft: 4
  },
})