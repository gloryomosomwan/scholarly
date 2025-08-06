import { StyleSheet, View, } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'
import DateTimePicker from '@/components/Form/DateTimePicker'
import TextInputField from '@/components/Form/TextInputField'
import ButtonRow from '@/components/Form/ButtonRow'

import { useTheme } from '@/hooks'

export default function EventForm() {
  const theme = useTheme()
  const [title, setTitle] = useState('Add title')
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  const [location, setLocation] = useState('')
  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, {}]}>
        <View style={[styles.formContainer, {}]}>
          <PrimaryTextInputField placeholder='Add name' value={title} onChangeText={setTitle} />
          <DateTimePicker placeholder='Add start date' date={start} setDate={setStart} dueType={'date'} />
          <DateTimePicker placeholder='Add end date' date={end} setDate={setEnd} dueType={'date'} />
          <TextInputField placeholder='Add location' value={location} onChangeText={setLocation} />
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