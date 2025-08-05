import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { courses } from '@/data/data'
import { SymbolView } from 'expo-symbols'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import { useTheme } from '@/hooks'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import CourseModal from './CourseModal'

type CoursePickerProps = {
  course: string | null
  setCourse: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CoursePicker({ course, setCourse }: CoursePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  return (
    <View>
      <PressableOpacity onPress={() => {
        Keyboard.dismiss()
        modalRef.current?.present()
      }}>
        <View style={styles.detailRow}>
          <SymbolView name={'bookmark'} tintColor={theme.grey500} size={24} />
          {course ?
            (() => {
              const selected = courses.find(c => c.code === course)
              return (
                <View style={[styles.courseTag, { backgroundColor: theme.grey100 }]}>
                  <View style={[styles.courseDot, { backgroundColor: selected?.color ?? 'grey' }]} />
                  <Text style={[styles.courseText, { color: theme.text }]}>{course}</Text>
                </View>
              )
            })()
            :
            <Text style={[styles.detailText, { color: theme.grey500 }]}>Add course</Text>
          }
        </View>
      </PressableOpacity>
      <CourseModal setCourse={setCourse} courseSelectorModalRef={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  courseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  courseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '500',
  },
})