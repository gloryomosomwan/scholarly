import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CourseModal from '@/components/Modals/CourseModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { courses } from '@/data/data'
import { useTheme } from '@/hooks'

type CoursePickerProps = {
  course: string | null
  setCourse: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CoursePicker({ course, setCourse }: CoursePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View>
      <PressableOpacity onPress={handlePresentModal}>
        <View style={styles.row}>
          <SymbolView name={'bookmark'} tintColor={theme.grey500} size={24} />
          {course ?
            (() => {
              const selected = courses.find(c => c.code === course)
              return (
                <View style={[styles.tag, { backgroundColor: theme.grey100 }]}>
                  <View style={[styles.dot, { backgroundColor: selected?.color ?? 'grey' }]} />
                  <Text style={[styles.courseText, { color: theme.text }]}>{course}</Text>
                </View>
              )
            })()
            :
            <Text style={[styles.text, { color: theme.grey500 }]}>Add course</Text>
          }
        </View>
      </PressableOpacity>
      <CourseModal setCourse={setCourse} courseSelectorModalRef={modalRef} />
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