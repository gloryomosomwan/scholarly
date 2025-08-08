import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { eq } from 'drizzle-orm'
import { useSQLiteContext } from 'expo-sqlite'
import { router, useLocalSearchParams } from 'expo-router'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import TextInputField from '@/components/Form/TextInputField'
import ColorPicker from '@/components/Form/ColorPicker'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { db } from '@/db/init'
import { courses } from '@/db/schema'
import { Course } from '@/types'

export default function CourseForm() {
  const theme = useTheme()

  const { id } = useLocalSearchParams<{ id: string }>()
  let data = null;
  let convertedID = Number(id)
  if (id) {
    const sqlite = useSQLiteContext()
    data = sqlite.getFirstSync<Course>(`
      SELECT 
      id,
      code,
      name,
      color,
      instructor,
      lectureSchedule,
      seminarSchedule,
      labSchedule
      FROM courses 
      WHERE id = ${convertedID}`)
  }

  const [code, setCode] = useState<string | null>(data?.code ?? null)
  const [name, setName] = useState<string | null>(data?.name ?? null)
  const [color, setColor] = useState<string | null>(data?.color ?? null);
  const [instructor, setInstructor] = useState<string | null>(data?.instructor ?? null)
  const [lectureSchedule, setLectureSchedule] = useState<string | null>(data?.lectureSchedule ?? null)
  const [seminarSchedule, setSeminarSchedule] = useState<string | null>(data?.seminarSchedule ?? null)
  const [labSchedule, setLabSchedule] = useState<string | null>(data?.labSchedule ?? null)

  const createCourse = async () => {
    if (code !== null && name !== null && color !== null) {
      await db.insert(courses).values({
        name: name,
        code: code,
        color: color,
        semester_id: 1,
        instructor: instructor,
        lectureSchedule: lectureSchedule,
        seminarSchedule: seminarSchedule,
        labSchedule: labSchedule
      })
      router.back()
    }
  }

  const updateCourse = async () => {
    if (name !== null && code !== null && color !== null && id !== null) {
      await db.update(courses).set({
        name: name,
        code: code,
        color: color,
        instructor: instructor,
        lectureSchedule: lectureSchedule,
        seminarSchedule: seminarSchedule,
        labSchedule: labSchedule
      })
        .where(eq(courses.id, convertedID));
      router.dismissTo({ pathname: './[courseCode]', params: { id: id, courseCode: code, courseName: name, instructor: instructor, color: color } })
    }
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete course'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(courses).where(eq(courses.id, convertedID))
          router.replace('/(tabs)/(semester)')
        }
      }
    )
  }

  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.formContainer, {}]}>
        <PrimaryTextInputField placeholder='Add course code' value={code} onChangeText={setCode} />
        <TextInputField icon='graduationcap' placeholder="Add course name" value={name} onChangeText={setName} />
        <TextInputField icon='person' placeholder="Add instructor name" value={instructor} onChangeText={setInstructor} />
        <TextInputField icon='book.closed' placeholder="Add lecture schedule" value={lectureSchedule} onChangeText={setLectureSchedule} />
        <TextInputField icon='flask' placeholder="Add lab schedule" value={labSchedule} onChangeText={setLabSchedule} />
        <TextInputField icon='bubble.left.and.bubble.right' placeholder="Add seminar schedule" value={seminarSchedule} onChangeText={setSeminarSchedule} />
        <ColorPicker selectedColor={color} setSelectedColor={setColor} />
      </View>
      <ButtonRow create={createCourse} update={updateCourse} confirmDelete={confirmDelete} disabled={name === null || code === null || color === null} isCreateForm={id === undefined} />
    </View>
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