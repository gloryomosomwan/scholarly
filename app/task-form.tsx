import React, { useState } from 'react'
import { StyleSheet, View, ActionSheetIOS, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { eq } from 'drizzle-orm'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import CoursePicker from '@/components/Form/CoursePicker'
import PriorityPicker from '@/components/Form/PriorityPicker'
import TextInputField from '@/components/Form/TextInputField'
import ButtonRow from '@/components/Form/ButtonRow'
import DatePicker from '@/components/Form/DatePicker'
import TimePicker from '@/components/Form/TimePicker'
import FormContainer from '@/components/Form/FormContainer'

import { useTheme } from '@/hooks'
import { DueType, PriorityOption } from '@/types'
import { db } from '@/db/init'
import { tasks } from '@/db/schema'
import { useTaskById } from '@/hooks/useDatabase'
import { taskInsertSchema, taskUpdateSchema } from '@/db/drizzle-zod'

export default function TaskForm() {
  const theme = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  const taskData = id ? useTaskById(convertedID) : null // CHECK: should this violate hook rules?

  const [date, setDate] = useState<Date | null>(taskData?.due ? new Date(taskData.due) : null); // CHECK: this should be a date already? // rename this
  const [dueType, setDueType] = useState<DueType>(taskData?.dueType ? taskData.dueType : 'date');
  const [courseID, setCourseID] = useState<number | null>(taskData?.courseID ? taskData.courseID : null);
  const [priority, setPriority] = useState<PriorityOption | null>(taskData?.priority ? taskData.priority : null);
  const [title, setTitle] = useState(taskData?.title ? taskData.title : null)
  const [notes, setNotes] = useState(taskData?.description ? taskData.description : null)

  const task = {
    title: title,
    course_id: courseID,
    description: notes,
    due: date ? date.toISOString() : null,
    dueType: dueType,
    priority: priority,
    completed_at: taskData?.completedAt || null
  }

  const createTask = async () => {
    try {
      const parsed = taskInsertSchema.parse(task)
      await db.insert(tasks).values(parsed)
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async () => {
    try {
      const parsed = taskUpdateSchema.parse(task)
      await db.update(tasks).set(parsed).where(eq(tasks.id, convertedID))
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
          await db.delete(tasks).where(eq(tasks.id, convertedID))
          router.back()
        }
      }
    )
  }

  return (
    <FormContainer>
      <View style={styles.fieldContainer}>
        <PrimaryTextInputField placeholder='Enter title' value={title} onChangeText={setTitle} />
        <Text style={{ color: theme.text }}>{date?.toISOString() || 'null'}</Text>
        <DatePicker dateType='general' date={date} setDate={setDate} form='activity' />
        {date && <TimePicker date={date} setDate={setDate} dueType={dueType} setDueType={setDueType} />}
        <CoursePicker courseID={courseID} setCourseID={setCourseID} />
        <PriorityPicker priority={priority} setPriority={setPriority} />
        <TextInputField placeholder="Add notes" value={notes} onChangeText={setNotes} />
      </View>
      <ButtonRow confirmDelete={confirmDelete} create={createTask} update={updateTask} isCreateForm={id === undefined} disabled={!taskInsertSchema.safeParse(task).success} />
    </FormContainer>
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
  fieldContainer: {
    gap: 24,
  },
})