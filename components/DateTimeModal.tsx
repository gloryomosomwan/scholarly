import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '@/components/PressableOpacity';

type DateTimeModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  handleSheetChanges: (index: number) => void
  handleSetDate: (date: Date) => void
}

export default function DateTimeModal({ handleSetDate, bottomSheetModalRef, handleSheetChanges }: DateTimeModalProps) {
  const theme = useTheme()
  const [internalDate, setInternalDate] = useState(new Date())

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || internalDate;
    setInternalDate(currentDate)
  };

  function handlePress() {
    handleSetDate(internalDate)
    bottomSheetModalRef.current?.dismiss()
  }

  const BottomSheetHandle = () => {
    return (
      <View style={[styles.bottomSheetHandle, { backgroundColor: theme.primary }]}>
        <PressableOpacity style={[styles.doneButton]} onPress={handlePress}>
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
        handleComponent={() => <BottomSheetHandle />}
      >
        <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
          <DateTimePicker
            testID="dateTimePicker"
            value={internalDate}
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
  bottomSheetHandle: {
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 10
  },
})