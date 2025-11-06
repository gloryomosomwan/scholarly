import { ActionSheetIOS, StyleSheet, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addHours, isBefore, roundToNearestHours } from 'date-fns'
import { eq } from 'drizzle-orm'
import { router, useLocalSearchParams } from 'expo-router'
import * as z from "zod";

import { useTheme } from '@/hooks'
import { useTestById } from '@/hooks/useDatabase'
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
  const testData = id ? useTestById(convertedID) : null

  const { currentDate } = useCalendarStore()
  const initialDate = new Date(currentDate.getTime())
  initialDate.setHours(new Date().getHours(), new Date().getMinutes())

  const [name, setName] = useState<string | null>(testData?.name ? testData.name : null)
  const [startDate, setStartDate] = useState<Date>(testData?.startDate ? testData.startDate : roundToNearestHours(initialDate, { roundingMethod: 'ceil' }))
  const [endDate, setEndDate] = useState<Date>(testData?.endDate ? testData.endDate : addHours(roundToNearestHours(initialDate, { roundingMethod: 'ceil' }), 1))
  const [location, setLocation] = useState(testData?.location ? testData.location : null)
  const [notes, setNotes] = useState<string | null>(testData?.notes ? testData.notes : null)
  const [weight, setWeight] = useState<string | null>(testData?.weight ? testData.weight.toString() : null)
  const [grade, setGrade] = useState<number | null>(testData?.grade ? testData.grade : null)

  const invalidDates = (startDate && endDate && isBefore(endDate, startDate)) ? true : false

  function changeStartDate(date: Date) {
    setStartDate(date)
    setEndDate(addHours(roundToNearestHours(date, { roundingMethod: 'ceil' }), 1))
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
    name: name,
    start_date: startDate?.toISOString(),
    end_date: endDate?.toISOString(),
    course_id: courseID ? parseInt(courseID) : testData?.courseID,
    location: location,
    notes: notes,
    grade: grade,
    weight: Number(weight) || null
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
        <PrimaryTextInputField placeholder='Add name' value={name} onChangeText={setName} />
        <DateTimePicker date={startDate} setDate={changeStartDate} />
        <DateTimePicker date={endDate} setDate={setEndDate} invalid={invalidDates} />
        <TextInputField placeholder='Add location' value={location} onChangeText={setLocation} icon='mappin.circle.fill' />
        <TextInputField placeholder='Add notes' value={notes} onChangeText={setNotes} />
        <NumericInputField placeholder='Add item weight' value={weight} onChangeText={setWeight} invalid={!weightString.safeParse(weight).success} />
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