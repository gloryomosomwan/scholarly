import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'
import { eq } from 'drizzle-orm'

import DatePicker from '@/components/Form/DatePicker'
import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import ButtonRow from '@/components/Form/ButtonRow'

import { useUserStore } from '@/stores'
import { useTheme } from '@/hooks'
import { getSemesterById } from '@/hooks/useDatabase'
import { semesters } from '@/db/schema'
import { db } from '@/db/init'
import { semesterInsertSchema, semesterUpdateSchema } from '@/db/drizzle-zod'

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
      if (currentSemesterID === undefined) {
        setSemesterID(semesterData.lastInsertRowId)
      }
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
          router.back()
        }
      }
    )
  }

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, {}]}>
        <View style={[styles.formContainer, {}]}>
          <PrimaryTextInputField placeholder='Add semester name' value={name} onChangeText={setName} />
          <DatePicker dateType='start' date={start} setDate={setStart} form='semester' />
          <DatePicker dateType='end' date={end} setDate={setEnd} form='semester' />
        </View>
        <ButtonRow create={createSemester} update={updateSemester} confirmDelete={confirmDelete} isCreateForm={id === undefined} disabled={!semesterInsertSchema.safeParse(semester).success} />
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