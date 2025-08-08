import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'

import DateTimePicker from '@/components/Form/DateTimePicker'
import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { semesters } from '@/db/schema'
import { db } from '@/db/init'
import { Semester } from '@/types'
import { eq } from 'drizzle-orm'

export default function SemesterForm() {
  const theme = useTheme()

  let data = null;
  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  if (id) {
    const sqlite = useSQLiteContext()
    data = sqlite.getFirstSync<Semester>(`
      SELECT 
      id,
      name,
      start,
      end
      FROM semesters 
      WHERE id = ${convertedID}`)
  }

  const [name, setName] = useState<string | null>(data?.name ?? null)
  const [start, setStart] = useState<Date | null>(data?.start ?? null)
  const [end, setEnd] = useState<Date | null>(data?.end ?? null)

  const createSemester = async () => {
    try {
      if (name !== null && start !== null && end !== null) {
        await db.insert(semesters).values({
          name: name,
          start: start.toISOString(),
          end: end.toISOString()
        })
      }
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const updateSemester = async () => {
    if (name !== null && start !== null && end !== null) {
      await db.update(semesters).set({
        name: name,
        start: start.toISOString(),
        end: end.toISOString()
      })
        .where((eq(semesters.id, convertedID)));
      router.back()
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
          <DateTimePicker placeholder='Add start date' date={start} setDate={setStart} dueType={'date'} />
          <DateTimePicker placeholder='Add end date' date={end} setDate={setEnd} dueType={'date'} />
        </View>
        <ButtonRow create={createSemester} update={updateSemester} confirmDelete={confirmDelete} isCreateForm={id === undefined} disabled={name === null || start === null || end === null} />
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