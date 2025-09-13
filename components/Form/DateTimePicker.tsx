import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'

type DateTimePickerProps = {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  invalid?: boolean
}

export default function DateTimePicker({ date, setDate, invalid }: DateTimePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  const datetimeString = `${date?.toLocaleString(undefined, { weekday: 'short', month: 'long', day: 'numeric' })} at ${date?.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
  return (
    <View>
      <PressableOpacity style={styles.row} onPress={handlePresentModal}>
        <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.text, { color: invalid ? 'red' : theme.grey500 }]}>{datetimeString}</Text>
      </PressableOpacity>
      <DateTimeModal initialDate={date} setDate={setDate} bottomSheetModalRef={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})