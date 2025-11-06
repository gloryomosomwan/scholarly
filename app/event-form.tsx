import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { eq } from 'drizzle-orm'
import { addHours, isBefore, roundToNearestHours } from 'date-fns'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import TextInputField from '@/components/Form/TextInputField'
import CoursePicker from '@/components/Form/CoursePicker'
import ButtonRow from '@/components/Form/ButtonRow'
import EventTypePicker from '@/components/Form/EventTypePicker'
import RecurrencePicker from '@/components/Form/Recurrence/RecurrencePicker'
import FormContainer from '@/components/Form/FormContainer'

import { useTheme } from '@/hooks'
import { EventType } from '@/types'
import { eventInsertSchema, eventUpdateSchema } from '@/db/drizzle-zod'
import { db } from '@/db/init'
import { events } from '@/db/schema'
import { useEventById } from '@/hooks/useDatabase'
import { useCalendarStore } from '@/stores/calendar'

export default function EventForm() {
  const theme = useTheme()

  const { id, coursePageID } = useLocalSearchParams<{ id: string, coursePageID: string }>()
  const convertedID = Number(id)
  const eventData = id ? useEventById(convertedID) : null
  const { currentDate } = useCalendarStore()
  const initialDate = new Date(currentDate.getTime())
  initialDate.setHours(new Date().getHours(), new Date().getMinutes())

  const [type, setType] = useState<EventType | null>(eventData?.type ? eventData.type : 'general')
  const [name, setName] = useState<string | null>(eventData?.name ? eventData.name : null)
  const [startDate, setStartDate] = useState<Date>(eventData?.startDate ? eventData.startDate : roundToNearestHours(initialDate, { roundingMethod: 'ceil' }))
  const [endDate, setEndDate] = useState<Date>(eventData?.endDate ? eventData.endDate : addHours(roundToNearestHours(initialDate, { roundingMethod: 'ceil' }), 1))
  const [location, setLocation] = useState(eventData?.location ? eventData.location : null)
  const [courseID, setCourseID] = useState<number | null>(eventData?.courseID ? eventData.courseID : (coursePageID ? parseInt(coursePageID) : null))
  const [recurring, setRecurring] = useState<string | null>(eventData?.recurring ? eventData.recurring : null)

  useEffect(() => {
    if (eventData) {
      setType(eventData.type ? eventData.type : 'general')
      setName(eventData.name ? eventData.name : null)
      setStartDate(eventData.startDate ? eventData.startDate : roundToNearestHours(initialDate, { roundingMethod: 'ceil' }))
      setEndDate(eventData.endDate ? eventData.endDate : addHours(roundToNearestHours(initialDate, { roundingMethod: 'ceil' }), 1))
      setLocation(eventData.location ? eventData.location : null)
      setCourseID(eventData.courseID ? eventData.courseID : (coursePageID ? parseInt(coursePageID) : null))
      setRecurring(eventData.recurring ? eventData.recurring : null)
    }
  }, [eventData])

  const invalid = (startDate && endDate && isBefore(endDate, startDate)) ? true : false

  function changeStartDate(date: Date) {
    setStartDate(date)
    setEndDate(addHours(roundToNearestHours(date, { roundingMethod: 'ceil' }), 1))
  }

  const event = {
    name: name,
    type: type,
    start_date: startDate?.toISOString(),
    end_date: endDate?.toISOString(),
    course_id: courseID,
    location: location,
    recurring: recurring
  }

  const create = async () => {
    try {
      const parsed = eventInsertSchema.parse(event)
      await db.insert(events).values(parsed)
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    try {
      const parsed = eventUpdateSchema.parse(event)
      await db.update(events).set(parsed).where(eq(events.id, convertedID))
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete event'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(events).where(eq(events.id, convertedID))
          router.dismissAll()
        }
      }
    )
  }

  return (
    <FormContainer>
      <View style={[styles.fieldContainer, {}]}>
        <PrimaryTextInputField placeholder='Enter name' value={name} onChangeText={setName} />
        <DateTimePicker date={startDate} setDate={changeStartDate} />
        <DateTimePicker date={endDate} invalid={invalid} setDate={setEndDate} />
        <EventTypePicker eventType={type} setEventType={setType} />
        <TextInputField placeholder='Add location' icon='mappin.circle.fill' value={location} onChangeText={setLocation} />
        <CoursePicker courseID={courseID} setCourseID={setCourseID} />
        <RecurrencePicker recurring={recurring} setRecurring={setRecurring} startDate={startDate} />
      </View>
      {/* disabled = invalid because since dates are already preselected, the only invalid event is one with out of order dates */}
      <ButtonRow create={create} update={update} confirmDelete={confirmDelete} isCreateForm={id === undefined} disabled={invalid || !eventInsertSchema.safeParse(event).success} />
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  fieldContainer: {
    gap: 24,
  },
})