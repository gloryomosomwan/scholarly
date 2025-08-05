import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import TextInputField from '@/components/Form/TextInputField'
import ColorPicker from '@/components/Form/ColorPicker'

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
      <View style={styles.buttonRowContainer}>
        <Pressable
          style={[styles.closeButton, { backgroundColor: '#eee' }]}
          onPress={() => {
            router.back()
          }}
          accessibilityLabel="Close"
        >
          <Text style={[styles.closeButtonText, { color: '#333' }]}> × </Text>
        </Pressable>
        <Pressable
          style={[styles.saveButton, { backgroundColor: '#007AFF' }]}
          onPress={() => {
            console.log(courseCode, courseName, selectedColor)
            router.back()
          }}
          accessibilityLabel="Save"
        >
          <Text style={[styles.saveButtonText, { color: '#fff' }]}> Save </Text>
        </Pressable>
      </View>
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

  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  saveButton: {
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
})