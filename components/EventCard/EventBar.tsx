import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { eachDayOfInterval, isEqual, isSameDay, startOfDay } from 'date-fns'
import { router } from 'expo-router'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'
import { Event, Test } from '@/types'
import { getEventClass } from '@/utils/event'

type EventBarProps = {
  event: Event | Test;
  date: Date;
}

export default function EventBar({ event, date }: EventBarProps) {
  const theme = useTheme()
  const dates = eachDayOfInterval({ start: event.startDate, end: event.endDate })
  // If the event ends at midnight, remove the day representing the end date from the dates array
  if (isEqual(event.endDate, startOfDay(event.endDate))) dates.splice(dates.length - 1)
  const day = dates.findIndex((element) => isSameDay(date, element))
  const eventClass = getEventClass(event.startDate, event.endDate)
  return (
    <PressableOpacity onPress={() => router.navigate({ pathname: '/event-form', params: { id: event.id } })}>
      <View style={[styles.container, { backgroundColor: theme.accent, borderColor: theme.grey200 }]}>
        <Text style={[styles.titleText, { color: 'white' }]}>{event.name || '(No title)'}</Text>
        {eventClass === 'multiday' && <Text style={[styles.titleText, { color: 'white' }]}>{`Day ${day + 1}/${dates.length}`}</Text>}
      </View>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderWidth: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500'
  },
})