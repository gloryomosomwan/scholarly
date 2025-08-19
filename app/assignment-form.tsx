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

export default function AssignmentForm() {
  const theme = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  const assignment = id ? getAssignmentById(convertedID) : null // should this violate hook rules?

  const [date, setDate] = useState<Date | null>(assignment?.due ? new Date(assignment.due) : null);
  const [dueType, setDueType] = useState<DueType | null>(assignment?.dueType ? assignment.dueType : null);
  const [courseID, setCourseID] = useState<number | null>(assignment?.courseID ? assignment.courseID : null);
  const [title, setTitle] = useState(assignment?.title ? assignment.title : null)
  const [notes, setNotes] = useState(assignment?.description ? assignment.description : null)

  const createAssignment = async () => {
    try {
      if (title !== null && courseID !== null && date !== null && dueType !== null) {
        await db.insert(assignments).values({
          title: title,
          course_id: courseID,
          description: notes,
          due: date.toISOString(),
          due_type: dueType,
          completed_at: null,
        })
        router.back()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateTask = async () => {
    if (title !== null && id !== null && courseID !== null && date !== null && dueType !== null) {
      await db.update(assignments).set({
        title: title,
        course_id: courseID,
        description: notes,
        due: date.toISOString(),
        due_type: dueType,
        completed_at: null
      })
        .where(eq(assignments.id, convertedID));
      router.back()
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
        <ButtonRow confirmDelete={confirmDelete} create={createAssignment} update={updateTask} isCreateForm={id === undefined} disabled={
          title?.length === 0 || date === null || courseID === null || dueType === null
        } />
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