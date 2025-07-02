import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useTheme } from '@/utils/useTheme'

type DateTimeModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  handleSheetChanges: (index: number) => void
}

export default function DateTimeModal({ bottomSheetModalRef, handleSheetChanges }: DateTimeModalProps) {
  const theme = useTheme()
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        handleStyle={{ backgroundColor: theme.primary, borderRadius: 10 }}
        handleIndicatorStyle={[styles.handleIndicator, {}]}
        backgroundStyle={{ backgroundColor: theme.primary }}
      >
        <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display={'inline'}
            onChange={onChange}
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
})