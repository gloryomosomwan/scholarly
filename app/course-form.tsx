import { ActionSheetIOS, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { eq } from 'drizzle-orm'
import { router, useLocalSearchParams } from 'expo-router'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import TextInputField from '@/components/Form/TextInputField'
import ColorPicker from '@/components/Form/ColorPicker'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { db } from '@/db/init'
import { courses } from '@/db/schema'
import { getCourseById } from '@/hooks/useDatabase'

export default function CourseForm() {
  const theme = useTheme()

  const { id } = useLocalSearchParams<{ id: string }>()
  let convertedID = Number(id)
  const course = id ? getCourseById(convertedID) : null

  const [code, setCode] = useState<string | null>(course?.code ?? null)
  const [name, setName] = useState<string | null>(course?.name ?? null)
  const [color, setColor] = useState<string | null>(course?.color ?? null);
  const [instructor, setInstructor] = useState<string | null>(course?.instructor ?? null)

  const createCourse = async () => {
    if (code !== null && name !== null && color !== null) {
      await db.insert(courses).values({
        name: name,
        code: code,
        color: color,
        semester_id: 1,
        instructor: instructor,
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
    paddingBottom: 150
  },
  formContainer: {
    gap: 24,
  },
})