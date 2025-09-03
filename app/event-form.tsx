import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import TextInputField from '@/components/Form/TextInputField'
import CoursePicker from '@/components/Form/CoursePicker'
import ButtonRow from '@/components/Form/ButtonRow'
import EventTypePicker from '@/components/Form/EventTypePicker'
import RecurrencePicker from '@/components/Form/RecurrencePicker'

import { useTheme } from '@/hooks'
import { EventType } from '@/types'
import { eventInsertSchema, eventUpdateSchema } from '@/db/drizzle-zod'
import { db } from '@/db/init'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getEventById } from '@/hooks/useDatabase'

export default function EventForm() {
  const theme = useTheme()

  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  const eventData = id ? getEventById(convertedID) : null

  const [type, setType] = useState<EventType | null>(eventData?.type ? eventData.type : null)
  const [name, setName] = useState<string | null>(eventData?.name ? eventData.name : null)
  const [startDate, setStartDate] = useState<Date | null>(eventData?.startDate ? eventData.startDate : null)
  const [endDate, setEndDate] = useState<Date | null>(eventData?.endDate ? eventData.endDate : null)
  const [location, setLocation] = useState(eventData?.location ? eventData.location : null)
  const [courseID, setCourseID] = useState<number | null>(eventData?.courseID ? eventData.courseID : null)
  const [recurring, setRecurring] = useState<string | null>(null)
  console.log(recurring)

  const event = {
    name: name,
    type: type,
    start_date: startDate?.toISOString(),
    end_date: endDate?.toISOString(),
    course_id: courseID,
    location: location
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
          router.back()
        }
      }
    )
  }

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, {}]}>
        <View style={[styles.formContainer, {}]}>
          <PrimaryTextInputField placeholder='Enter name' value={name} onChangeText={setName} />
          <DateTimePicker placeholder='Add start date' date={startDate} setDate={setStartDate} dueType={'datetime'} />
          <DateTimePicker placeholder='Add end date' date={endDate} setDate={setEndDate} dueType={'datetime'} />
          <EventTypePicker eventType={type} setEventType={setType} />
          <TextInputField placeholder='Add location' icon='mappin.circle.fill' value={location} onChangeText={setLocation} />
          <CoursePicker courseID={courseID} setCourseID={setCourseID} />
          <RecurrencePicker recurring={recurring} setRecurring={setRecurring} />
        </View>
        <ButtonRow create={create} update={update} confirmDelete={confirmDelete} isCreateForm={id === undefined} disabled={!eventInsertSchema.safeParse(event).success} />
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  formContainer: {
    gap: 24,
  },
})