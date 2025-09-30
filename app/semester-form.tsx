import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { eq } from 'drizzle-orm'
import FormContainer from '@/components/Form/FormContainer'

import { useUserStore } from '@/stores'
import { useTheme } from '@/hooks'
import { getSemesterById } from '@/hooks/useDatabase'
import { semesters } from '@/db/schema'
import { db } from '@/db/init'
import { semesterInsertSchema, semesterUpdateSchema } from '@/db/drizzle-zod'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import SemesterDatePicker from '@/components/SemesterForm/SemesterDatePicker'
import ButtonRow from '@/components/Form/ButtonRow'

export default function SemesterForm() {
  const theme = useTheme()

  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  const semesterData = id ? getSemesterById(convertedID) : null

  const [name, setName] = useState<string | null>(semesterData?.name ?? null)
  const [start, setStart] = useState<Date | null>(semesterData?.start ?? null)
  const [end, setEnd] = useState<Date | null>(semesterData?.end ?? null)

  const currentSemesterID = useUserStore((state) => state.semesterID)
  const setSemesterID = useUserStore((state) => state.setSemesterID)

  const semester = {
    name: name,
    start: start?.toISOString(),
    end: end?.toISOString()
  }

  const createSemester = async () => {
    try {
      const parsed = semesterInsertSchema.parse(semester)
      const semesterData = await db.insert(semesters).values(parsed)
      if (currentSemesterID === undefined) setSemesterID(semesterData.lastInsertRowId)
      router.back()
    } catch (error) {
      console.log(error)
      router.back()
    }
  }

  const updateSemester = async () => {
    try {
      const parsed = semesterUpdateSchema.parse(semester)
      await db
        .update(semesters)
        .set(parsed)
        .where(eq(semesters.id, convertedID))
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete task'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(semesters).where(eq(semesters.id, convertedID))
          if (currentSemesterID === convertedID) setSemesterID(undefined)
          router.back()
        }
      }
    )
  }

  return (
    <FormContainer>
      <View style={[styles.formContainer, {}]}>
        <PrimaryTextInputField placeholder='Add semester name' value={name} onChangeText={setName} />
        <SemesterDatePicker label='Start Date' date={start} setDate={setStart} />
        <SemesterDatePicker label='End Date' date={end} setDate={setEnd} />
      </View>
      <ButtonRow create={createSemester} update={updateSemester} confirmDelete={confirmDelete} isCreateForm={id === undefined} disabled={!semesterInsertSchema.safeParse(semester).success} />
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 24,
  },
})