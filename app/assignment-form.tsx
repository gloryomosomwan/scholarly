import React, { useState } from 'react'
import { StyleSheet, View, ActionSheetIOS } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'
import { eq } from 'drizzle-orm'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import CoursePicker from '@/components/Form/CoursePicker'
import TextInputField from '@/components/Form/TextInputField'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { DueType } from '@/types'
import { db } from '@/db/init'
import { assignments } from '@/db/schema'
import { getAssignmentById } from '@/hooks/useDatabase'
import { assignmentInsertSchema, assignmentUpdateSchema } from '@/db/drizzle-zod'

export default function AssignmentForm() {
  const theme = useTheme();

  const { id, initialCourseID } = useLocalSearchParams<{ id: string, initialCourseID: string }>()
  const convertedID = Number(id)
  const assignmentData = id ? getAssignmentById(convertedID) : null // should this violate hook rules?

  const [date, setDate] = useState<Date | null>(assignmentData?.due ? new Date(assignmentData.due) : null);
  const [dueType, setDueType] = useState<DueType | null>(assignmentData?.dueType ? assignmentData.dueType : null);
  const [courseID, setCourseID] = useState<number | null>(assignmentData?.courseID ? assignmentData.courseID : (initialCourseID ? parseInt(initialCourseID) : null))
  const [title, setTitle] = useState(assignmentData?.title ? assignmentData.title : null)
  const [notes, setNotes] = useState(assignmentData?.description ? assignmentData.description : null)

  const assignment = {
    title: title,
    course_id: courseID,
    description: notes,
    due: date?.toISOString(),
    due_type: dueType,
    completed_at: null
  }

  const createAssignment = async () => {
    try {
      const parsed = assignmentInsertSchema.parse(assignment)
      await db.insert(assignments).values(parsed)
      router.back()
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateAssignment = async () => {
    try {
      const parsed = assignmentUpdateSchema.parse(assignment)
      await db.update(assignments).set(parsed).where(eq(assignments.id, convertedID))
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete task'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(assignments).where(eq(assignments.id, convertedID))
          router.back()
        }
      }
    )
  }

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { backgroundColor: theme.secondary }]}>
        <View style={styles.formContainer}>
          <PrimaryTextInputField placeholder='Enter title' value={title} onChangeText={setTitle} />
          <DateTimePicker date={date} setDate={setDate} dueType={dueType} setDueType={setDueType} />
          <CoursePicker courseID={courseID} setCourseID={setCourseID} />
          <TextInputField placeholder="Add notes" value={notes} onChangeText={setNotes} />
        </View>
        <ButtonRow confirmDelete={confirmDelete} create={createAssignment} update={updateAssignment} isCreateForm={id === undefined} disabled={!assignmentInsertSchema.safeParse(assignment).success} />
      </View >
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    gap: 10,
  },
  formContainer: {
    gap: 24,
  },
})