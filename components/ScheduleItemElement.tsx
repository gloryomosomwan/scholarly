import React from 'react'

import { Event, Test } from '@/types'
import { getScheduleItemClass } from '@/utils/scheduleItem'
import { useCalendarStore } from '@/stores/calendar'

import ScheduleItemCard from '@/components/Dashboard/ScheduleItemCard/ScheduleItemCard'
import ScheduleItemBar from '@/components/ScheduleItemBar'

type ScheduleItemElementProps = {
  item: Event | Test
}

export default function ScheduleItemElement({ item }: ScheduleItemElementProps) {
  const { currentDate } = useCalendarStore()
  const itemClass = getScheduleItemClass(item.startDate, item.endDate)
  // CHECK: Why don't these need keys?
  return (
    itemClass === 'regular' || itemClass === 'crossover'
      ? <ScheduleItemCard item={item} />
      : <ScheduleItemBar item={item} date={currentDate} />
  )
}