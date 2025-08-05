import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

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
  const router = useRouter()

  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.formContainer, {}]}>
        <PrimaryTextInputField placeholder='Enter course code' value={courseCode} onChangeText={setCourseCode} />
        <TextInputField placeholder="Enter course name" value={courseName} onChangeText={setCourseName} />
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
  fieldContainer: {
    flexDirection: 'row',
    gap: 16
  },
})