import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { courses } from '@/data/data'

import { useTheme } from '@/hooks'

export default function CourseForm() {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const courseColors = courses.map(course => course.color);

  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.fieldContainer, {}]}>
        <TextInput
          placeholder="Enter course code"
          style={[styles.titleText, { color: theme.text }]}
          placeholderTextColor={theme.grey500}
          returnKeyType='done'
          multiline
          blurOnSubmit
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={[styles.fieldContainer, {}]}>
        <TextInput
          placeholder="Enter course name"
          style={[styles.detailText, { color: theme.text }]}
          placeholderTextColor={theme.grey500}
          returnKeyType='done'
          multiline
          blurOnSubmit
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={[styles.fieldContainer, {}]}>
        <Text style={[styles.detailText, { color: theme.grey500 }]}>Select course color</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  fieldContainer: {},
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
})