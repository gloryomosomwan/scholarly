import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import TextInputField from '@/components/Form/TextInputField'
import ColorPicker from '@/components/Form/ColorPicker'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { db } from '@/db/init'
import { courses } from '@/db/schema'
import { Button } from 'react-native'

export default function CourseForm() {
  const theme = useTheme()
  const [code, setCode] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null);
  const [instructor, setInstructor] = useState<string | null>(null)
  const [lectureSchedule, setLectureSchedule] = useState<string | null>(null)
  const [seminarSchedule, setSeminarSchedule] = useState<string | null>(null)
  const [labSchedule, setLabSchedule] = useState<string | null>(null)

  const createCourse = async () => {
    if (code !== null && name !== null && color !== null) {
      await db.insert(courses).values({
        name: name,
        code: code,
        color: color,
        instructor: instructor,
        lectureSchedule: lectureSchedule,
        seminarSchedule: seminarSchedule,
        labSchedule: labSchedule
      })
      router.back()
    }
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
        <Button title='Create' onPress={createCourse} />
      </View>
      {/* <ButtonRow /> */}
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