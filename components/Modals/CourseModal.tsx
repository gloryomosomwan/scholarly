import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import CourseItem from '@/components/Modals/Items/CourseItem'

import { courses } from '@/data/data'

type CourseModalProps = {
  courseSelectorModalRef: React.RefObject<BottomSheetModal>
  setCourse: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CourseModal({ courseSelectorModalRef, setCourse }: CourseModalProps) {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={courseSelectorModalRef} scrollable>
      {courses.map(course => (
        <CourseItem
          key={course.code}
          code={course.code}
          name={course.name ?? ''}
          color={course.color}
          onSelect={({ code }) => {
            setCourse(code)
            courseSelectorModalRef.current?.dismiss()
          }}
        />
      ))}
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({})