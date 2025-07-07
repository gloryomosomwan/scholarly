import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { courses } from '@/data/data'
import { useRouter } from 'expo-router'

import { useTheme } from '@/hooks'
import { SymbolView } from 'expo-symbols'

export default function CourseForm() {
  const theme = useTheme()
  const [courseCode, setCourseCode] = useState('')
  const [courseName, setCourseName] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const router = useRouter()

  const courseColors = courses.map(course => course.color);

  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.formContainer, {}]}>
        <View style={[styles.fieldContainer, {}]}>
          <TextInput
            placeholder="Enter code"
            style={[styles.titleText, { color: theme.text }]}
            placeholderTextColor={theme.grey500}
            returnKeyType='done'
            multiline
            blurOnSubmit
            value={courseCode}
            onChangeText={setCourseCode}
          />
        </View>
        <View style={[styles.fieldContainer, {}]}>
          <SymbolView name={'graduationcap.fill'} tintColor={theme.grey500} />
          <TextInput
            placeholder="Enter name"
            style={[styles.detailText, { color: theme.text }]}
            placeholderTextColor={theme.grey500}
            returnKeyType='done'
            multiline
            blurOnSubmit
            value={courseName}
            onChangeText={setCourseName}
          />
        </View>
        <View style={[styles.colorPickerField, { flexDirection: 'column' }]}>
          <View style={[styles.fieldContainer]}>
            <SymbolView name={'paintpalette'} tintColor={theme.grey500} />
            <Text style={[styles.detailText, { color: theme.grey500 }]}>Choose color</Text>
          </View>
          <View style={styles.colorPickerContainer}>
            {courseColors.map((color, index) => (
              <Pressable
                key={index}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorCircle,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>
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
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 8,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    alignSelf: 'center'
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorCircle: {
    borderColor: 'black',
  },
  colorPickerField: {
    gap: 8
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