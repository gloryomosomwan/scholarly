import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import CourseItem from '@/components/Modals/Items/CourseItem'

import { useCourses } from '@/hooks/useDatabase'

type CourseModalProps = {
  courseSelectorModalRef: React.RefObject<BottomSheetModal>
  setCourseID: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CourseModal({ courseSelectorModalRef, setCourseID }: CourseModalProps) {
  const courses = useCourses()
  return (
    <CustomBottomSheetModal bottomSheetModalRef={courseSelectorModalRef} scrollable>
      {courses.map(course => (
        <CourseItem
          key={course.code}
          id={course.id}
          code={course.code}
          name={course.name ?? ''}
          color={course.color}
          onSelect={(id) => {
            setCourseID(id)
            courseSelectorModalRef.current?.dismiss()
          }}
        />
      ))}
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({})