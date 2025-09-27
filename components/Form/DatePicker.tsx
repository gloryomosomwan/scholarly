import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import DateModal from '@/components/Modals/DateModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import ClearButton from '@/components/Buttons/ClearButton'

import { useTheme } from '@/hooks'

type DatePickerProps = {
  dateType: string;
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  form: string
}

export default function DatePicker({ date, setDate, dateType, form }: DatePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const placeholder = getPlaceholder(dateType);
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View style={styles.container}>
      <PressableOpacity style={styles.button} onPress={handlePresentModal}>
        <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
        {!date ?
          <Text style={[styles.text, { color: theme.grey500 }]}>{placeholder}</Text>
          :
          <View>
            <Text style={[styles.text, { color: theme.grey500 }]}>{`${date?.toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}`}</Text>
          </View>
        }
      </PressableOpacity>
      {date && <ClearButton onPress={() => setDate(null)} />}
      <DateModal dateType={dateType} initialDate={date} setDate={setDate} bottomSheetModalRef={modalRef} form={form} />
    </View>
  )
}

function getPlaceholder(type: string) {
  switch (type) {
    case 'start': return 'Add start date';
    case 'end': return 'Add end date';
    case 'general': return 'Add date';
    default: return 'Add date';
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
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