import { ActionSheetIOS, StyleSheet, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addHours, isBefore, roundToNearestHours } from 'date-fns'
import { eq } from 'drizzle-orm'
import { router, useLocalSearchParams } from 'expo-router'
import * as z from "zod";

import { useTheme } from '@/hooks'
import { getTestById } from '@/hooks/useDatabase'
import { useCalendarStore } from '@/stores/calendar'
import { testInsertSchema, testUpdateSchema } from '@/db/drizzle-zod'
import { db } from '@/db/init'
import { tests } from '@/db/schema'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import FormContainer from '@/components/Form/FormContainer'
import DateTimePicker from '@/components/Form/DateTimePicker'
import TextInputField from '@/components/Form/TextInputField'
import ButtonRow from '@/components/Form/ButtonRow'
import NumericInputField from '@/components/Form/NumericInputField'

export default function TestForm() {
  const theme = useTheme()
  const { id, courseID } = useLocalSearchParams<{ id: string, courseID: string }>()
  const convertedID = Number(id)
  const testData = id ? getTestById(convertedID) : null

  const { currentDate } = useCalendarStore()
  const initialDate = new Date(currentDate.getTime())
  initialDate.setUTCHours(new Date().getUTCHours(), new Date().getUTCMinutes())

  const [title, setTitle] = useState<string | null>(testData?.title ? testData.title : null)
  const [start, setStart] = useState<Date>(testData?.start ? testData.start : roundToNearestHours(initialDate, { roundingMethod: 'ceil' }))
  const [end, setEnd] = useState<Date>(testData?.end ? testData.end : addHours(roundToNearestHours(initialDate, { roundingMethod: 'ceil' }), 1))
  const [location, setLocation] = useState(testData?.location ? testData.location : null)
  const [notes, setNotes] = useState<string | null>(testData?.notes ? testData.notes : null)
  const [weight, setWeight] = useState<string | null>(testData?.weight ? testData.weight.toString() : null)
  const [grade, setGrade] = useState<number | null>(testData?.grade ? testData.grade : null)

  const invalidDates = (start && end && isBefore(end, start)) ? true : false

  function changeStartDate(date: Date) {
    setStart(date)
    setEnd(addHours(roundToNearestHours(date, { roundingMethod: 'ceil' }), 1))
  }

  useEffect(() => {
    // console.log(invalidDates)
    // console.log(weightString.safeParse(weight).error)
    // console.log(testInsertSchema.safeParse(test).error)
  })

  const weightString = z
    .string()
    .regex(/^(\d+(\.\d+)?)?$/, { message: "String must be empty or contain only positive numbers (integers or decimals)" })
    .nullable();

  const test = {
    title: title,
    start: start?.toISOString(),
    end: end?.toISOString(),
    course_id: parseInt(courseID),
    location: location,
    notes: notes,
    grade: grade,
    weight: Number(weight)
  }

  const create = async () => {
    try {
      const parsed = testInsertSchema.parse(test)
      await db.insert(tests).values(parsed)
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    try {
      const parsed = testUpdateSchema.parse(test)
      await db.update(tests).set(parsed).where(eq(tests.id, convertedID))
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete test'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(tests).where(eq(tests.id, convertedID))
          router.back()
        }
      }
    )
  }

  return (
    <FormContainer>
      <View style={[styles.formContainer, {}]}>
        <PrimaryTextInputField placeholder='Add title' value={title} onChangeText={setTitle} />
        <DateTimePicker date={start} setDate={changeStartDate} />
        <DateTimePicker date={end} setDate={setEnd} invalid={invalidDates} />
        <TextInputField placeholder='Add location' value={location} onChangeText={setLocation} icon='mappin.circle.fill' />
        <TextInputField placeholder='Add notes' value={notes} onChangeText={setNotes} />
        <NumericInputField placeholder='Add test weight' value={weight} onChangeText={setWeight} invalid={!weightString.safeParse(weight).success} />
      </View>
      <ButtonRow create={create} update={update} confirmDelete={confirmDelete} isCreateForm={id === undefined} disabled={invalidDates || !testInsertSchema.safeParse(test).success || !weightString.safeParse(weight).success} />
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 24,
  },
})