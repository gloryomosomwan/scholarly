import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CourseModal from '@/components/Modals/CourseModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'
import { getCourseById } from '@/hooks/useDatabase'

type CoursePickerProps = {
  initialCourseID: number | null
  setCourseID: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CoursePicker({ initialCourseID, setCourseID }: CoursePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const course = getCourseById(initialCourseID)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View>
      <PressableOpacity onPress={handlePresentModal}>
        <View style={styles.row}>
          <SymbolView name={'graduationcap.fill'} tintColor={theme.grey500} size={24} />
          {course ?
            (() => {
              return (
                <View style={[styles.tag, { backgroundColor: theme.grey100 }]}>
                  <View style={[styles.dot, { backgroundColor: course.color ?? 'grey' }]} />
                  <Text style={[styles.courseText, { color: theme.text }]}>{course.code}</Text>
                </View>
              )
            })()
            :
            <Text style={[styles.text, { color: theme.grey500 }]}>Add course</Text>
          }
        </View>
      </PressableOpacity>
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
})