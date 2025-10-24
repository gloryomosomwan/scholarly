import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { eachDayOfInterval, isEqual, isSameDay, startOfDay } from 'date-fns'
import { router } from 'expo-router'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'
import { Event, Test } from '@/types'
import { getScheduleItemClass } from '@/utils/scheduleItem'

type ScheduleItemBarProps = {
  item: Event | Test;
  date: Date;
}

export default function ScheduleItemBar({ item, date }: ScheduleItemBarProps) {
  const theme = useTheme()
  const dates = eachDayOfInterval({ start: item.startDate, end: item.endDate })
  // If the item ends at midnight, remove the day representing the end date from the dates array
  if (isEqual(item.endDate, startOfDay(item.endDate))) dates.splice(dates.length - 1)
  const day = dates.findIndex((element) => isSameDay(date, element))
  const itemClass = getScheduleItemClass(item.startDate, item.endDate)
  const pathname = item.type === 'test' ? '/test-form' : '/event-form'
  return (
    <PressableOpacity onPress={() => router.navigate({ pathname: pathname, params: { id: item.id } })}>
      <View style={[styles.container, { backgroundColor: theme.accent, borderColor: theme.grey200 }]}>
        <Text style={[styles.titleText, { color: 'white' }]}>{item.name || '(No title)'}</Text>
        {itemClass === 'multiday' && <Text style={[styles.titleText, { color: 'white' }]}>{`Day ${day + 1}/${dates.length}`}</Text>}
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