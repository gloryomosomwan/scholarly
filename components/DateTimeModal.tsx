import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '@/components/PressableOpacity';

type DateTimeModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  handleSheetChanges: (index: number) => void
  date: Date
  setDate: (date: Date) => void
}

export default function DateTimeModal({ date, setDate, bottomSheetModalRef, handleSheetChanges }: DateTimeModalProps) {
  const theme = useTheme()

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const HandleComponent = () => {
    return (
      <View style={[styles.handleComponent, { backgroundColor: theme.primary }]}>
        <PressableOpacity style={[styles.doneButton]} onPress={() => bottomSheetModalRef.current?.dismiss()}>
          <Text style={[styles.doneText, { color: theme.accent }]}>Done</Text>
        </PressableOpacity>
      </View>
    )
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: theme.primary }}
        handleComponent={() => <HandleComponent />}
      >
        <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display={'inline'}
            onChange={handlePickerChange}
            accentColor={theme.accent}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20
  },
  handleIndicator: {
    display: 'none'
  },
  doneText: {
    fontWeight: '500'
  },
  doneButton: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  handleComponent: {
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 10
  },
})