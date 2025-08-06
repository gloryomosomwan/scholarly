import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import TextInputField from '@/components/Form/TextInputField'
import ColorPicker from '@/components/Form/ColorPicker'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'

export default function CourseForm() {
  const theme = useTheme()
  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [instrutor, setInstructor] = useState('')
  const [lectureSchedule, setLectureSchedule] = useState('')
  const [seminarSchedule, setSeminarSchedule] = useState('')
  const [labSchedule, setLabSchedule] = useState('')

  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.formContainer, {}]}>
        <PrimaryTextInputField placeholder='Add course code' value={courseCode} onChangeText={setCourseCode} />
        <TextInputField icon='graduationcap' placeholder="Add course name" value={courseName} onChangeText={setCourseName} />
        <TextInputField icon='person' placeholder="Add instructor name" value={instrutor} onChangeText={setInstructor} />
        <TextInputField icon='book.closed' placeholder="Add lecture schedule" value={lectureSchedule} onChangeText={setLectureSchedule} />
        <TextInputField icon='flask' placeholder="Add lab schedule" value={labSchedule} onChangeText={setLabSchedule} />
        <TextInputField icon='bubble.left.and.bubble.right' placeholder="Add seminar schedule" value={seminarSchedule} onChangeText={setSeminarSchedule} />
        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
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