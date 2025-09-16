import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { eachDayOfInterval, isSameDay } from 'date-fns'
import { router } from 'expo-router'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'
import { Event } from '@/types'

type EventBarProps = {
  event: Event;
  date: Date;
  multiday: boolean;
}

export default function EventBar({ event, date, multiday }: EventBarProps) {
  const theme = useTheme()
  const result = eachDayOfInterval({ start: event.startDate, end: event.endDate })
  const day = result.findIndex((element) => isSameDay(date, element))
  return (
    <PressableOpacity onPress={() => router.navigate({ pathname: '/event-details', params: { id: event.id } })}>
      <View style={[styles.container, { backgroundColor: theme.accent, borderColor: theme.grey200 }]}>
        <Text style={[styles.titleText, { color: 'white' }]}>{event.name}</Text>
        {multiday && <Text style={[styles.titleText, { color: 'white' }]}>{`Day ${day + 1}/${result.length}`}</Text>}
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