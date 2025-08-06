import React, { useState } from 'react'
import { StyleSheet, View, ActionSheetIOS } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { eq } from 'drizzle-orm'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import CoursePicker from '@/components/Form/CoursePicker'
import PriorityPicker from '@/components/Form/PriorityPicker'
import TextInputField from '@/components/Form/TextInputField'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'
import { Activity, DueType, PriorityOption } from '@/types/types'
import { db } from '@/db/init'
import { tasks } from '@/db/schema'

export default function ActivityForm() {
  const theme = useTheme();

  let data = null;
  const { id } = useLocalSearchParams<{ id: string }>()
  let convertedID = Number(id)
  if (id) {
    const sqlite = useSQLiteContext()
    data = sqlite.getFirstSync<Activity>(`
      SELECT 
      id,
      title,
      course,
      due,
      due_type as dueType,
      description,
      priority,
      completed_at as completedAt
      FROM tasks
      WHERE id = ${convertedID}`)
  }

  const [date, setDate] = useState<Date | null>(data?.due ? new Date(data.due) : null);
  const [dueType, setDueType] = useState<DueType | null>(data?.dueType ? data.dueType : null);
  const [courseID, setCourseID] = useState<number | null>(data?.courseID ? data.courseID : null);
  const [priority, setPriority] = useState<PriorityOption | null>(data?.priority ? data.priority : null);
  const [title, setTitle] = useState(data?.title ? data.title : '')
  const [notes, setNotes] = useState(data?.description ? data.description : '')

  const createTask = async () => {
    if (title !== '') {
      await db.insert(tasks).values({
        title: title,
        course_id: courseID,
        description: notes,
        due: date ? date.toISOString() : null,
        dueType: dueType,
        priority: priority,
        completedAt: null
      })
      router.back()
    }
  }

  const updateTask = async () => {
    if (title !== '' && id !== null) {
      await db.update(tasks).set({
        title: title,
        course_id: courseID,
        description: notes,
        due: date ? date.toISOString() : null,
        dueType: dueType,
        priority: priority,
        completedAt: null
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
          <CoursePicker initialCourseID={courseID} setCourseID={setCourseID} />
          <PriorityPicker priority={priority} setPriority={setPriority} />
          <TextInputField placeholder="Add notes" value={notes} onChangeText={setNotes} />
        </View>
        <ButtonRow confirmDelete={confirmDelete} create={createTask} update={updateTask} isCreateForm={id === undefined} disabled={title.length === 0} />
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