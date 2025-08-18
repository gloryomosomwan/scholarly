import React, { useState } from 'react'
import { StyleSheet, View, ActionSheetIOS } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'
import { eq } from 'drizzle-orm'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import CoursePicker from '@/components/Form/CoursePicker'
import PriorityPicker from '@/components/Form/PriorityPicker'
import TextInputField from '@/components/Form/TextInputField'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { DueType, PriorityOption } from '@/types'
import { db } from '@/db/init'
import { tasks } from '@/db/schema'
import { getTaskById } from '@/hooks/useDatabase'

export default function TaskForm() {
  const theme = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  const task = id ? getTaskById(convertedID) : null // should this violate hook rules?

  const [date, setDate] = useState<Date | null>(task?.due ? new Date(task.due) : null);
  const [dueType, setDueType] = useState<DueType | null>(task?.dueType ? task.dueType : null);
  const [courseID, setCourseID] = useState<number | null>(task?.courseID ? task.courseID : null);
  const [priority, setPriority] = useState<PriorityOption | null>(task?.priority ? task.priority : null);
  const [title, setTitle] = useState(task?.title ? task.title : null)
  const [notes, setNotes] = useState(task?.description ? task.description : null)

  const createTask = async () => {
    try {
      if (title !== null) {
        await db.insert(tasks).values({
          title: title,
          course_id: courseID,
          description: notes,
          due: date ? date.toISOString() : null,
          dueType: dueType,
          priority: priority,
          completed_at: null
        })
        router.back()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateTask = async () => {
    if (title !== null && id !== null) {
      await db.update(tasks).set({
        title: title,
        course_id: courseID,
        description: notes,
        due: date ? date.toISOString() : null,
        dueType: dueType,
        priority: priority,
        completed_at: null
      })
        .where(eq(tasks.id, convertedID));
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
          await db.delete(tasks).where(eq(tasks.id, convertedID))
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
          <PriorityPicker priority={priority} setPriority={setPriority} />
          <TextInputField placeholder="Add notes" value={notes} onChangeText={setNotes} />
        </View>
        <ButtonRow confirmDelete={confirmDelete} create={createTask} update={updateTask} isCreateForm={id === undefined} disabled={title?.length === 0} />
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