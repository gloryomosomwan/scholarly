import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import DateTimePicker from '@/components/Form/DateTimePicker'
import PrimaryTextInputField from '@/components/Form/PrimaryTextInputField'

import { useTheme } from '@/hooks'

export default function EventForm() {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, {}]}>
        <View style={[styles.formContainer, {}]}>
          <PrimaryTextInputField placeholder='Add semester name' value={title} onChangeText={setTitle} />
          <DateTimePicker placeholder='Add start date' date={start} setDate={setStart} dueType={'date'} />
          <DateTimePicker placeholder='Add end date' date={end} setDate={setEnd} dueType={'date'} />
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