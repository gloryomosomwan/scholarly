import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CourseModal from '@/components/Modals/CourseModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import ClearButton from '@/components/Buttons/ClearButton'

import { useTheme } from '@/hooks'
import { getCourseById } from '@/hooks/useDatabase'

type CoursePickerProps = {
  courseID: number | null
  setCourseID: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CoursePicker({ courseID, setCourseID }: CoursePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const course = getCourseById(courseID)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View>
      <View style={styles.row}>
        <SymbolView name={'graduationcap.fill'} tintColor={theme.grey500} size={24} />
        {course ?
          <View style={styles.field}>
            <PressableOpacity onPress={handlePresentModal}>
              <View style={[styles.tag, { backgroundColor: theme.grey100 }]}>
                <View style={[styles.dot, { backgroundColor: course.color ?? 'grey' }]} />
                <Text style={[styles.courseText, { color: theme.text }]}>{course.code}</Text>
              </View>
            </PressableOpacity>
            <ClearButton onPress={() => setCourseID(null)} />
          </View>
          :
          <PressableOpacity onPress={handlePresentModal}>
            <Text style={[styles.text, { color: theme.grey500 }]}>Add course</Text>
          </PressableOpacity>
        }
      </View>
      <CourseModal setCourseID={setCourseID} courseSelectorModalRef={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '500',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
})