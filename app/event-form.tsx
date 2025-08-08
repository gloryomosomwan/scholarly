import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import TextInputField from '@/components/Form/TextInputField'
import CoursePicker from '@/components/Form/CoursePicker'
import ButtonRow from '@/components/Form/ButtonRow'
import RecurringPicker from '@/components/Form/RecurringPicker'

import { useTheme } from '@/hooks'
import { DueType } from '@/types'

export default function EventForm() {
  const theme = useTheme()

  const [title, setTitle] = useState('Add title')
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const [dueType, setDueType] = useState<DueType | null>(null)
  const [location, setLocation] = useState('')
  const [courseID, setCourseID] = useState<number | null>(null)
  const [recurring, setRecurring] = useState(false)

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, {}]}>
        <View style={[styles.formContainer, {}]}>
          <PrimaryTextInputField placeholder='Enter name' value={title} onChangeText={setTitle} />
          <DateTimePicker placeholder='Add start date' date={start} setDate={setStart} dueType={dueType} setDueType={setDueType} />
          <DateTimePicker placeholder='Add end date' date={end} setDate={setEnd} dueType={dueType} setDueType={setDueType} />
          <TextInputField placeholder='Add location' icon='mappin.circle.fill' value={location} onChangeText={setLocation} />
          <CoursePicker courseID={courseID} setCourseID={setCourseID} />
          <RecurringPicker />
        </View>
        {/* <ButtonRow /> */}
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  formContainer: {
    gap: 24,
  },
})