import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useTheme } from '@/hooks'
import PressableOpacity from '@/components/PressableOpacity';
import { DueType } from '@/types';

type DateTimeModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  initialDate: Date
  handleSheetChanges: (index: number) => void
  handleSetDate: (date: Date, dueType: DueType) => void
}

type PickerMode = 'date' | 'datetime';

export default function DateTimeModal({ initialDate, handleSetDate, bottomSheetModalRef, handleSheetChanges }: DateTimeModalProps) {
  const theme = useTheme()
  const [internalDate, setInternalDate] = useState(initialDate)
  const [pickerMode, setPickerMode] = useState<PickerMode>('date');

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || internalDate;
    setInternalDate(currentDate)
  };

  function handlePress() {
    if (pickerMode === 'date') {
      internalDate.setHours(0, 0, 0, 0)
      handleSetDate(internalDate, 'date')
    }
    else if (pickerMode === 'datetime') {
      handleSetDate(internalDate, 'datetime')
    }
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
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.primary }}
      handleComponent={() => <BottomSheetHandle />}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
        <View style={[styles.toggleContainer, { borderColor: theme.accent }]}>
          <PressableOpacity
            style={[styles.toggleButton, pickerMode === 'date' && { backgroundColor: theme.accent }]}
            onPress={() => setPickerMode('date')}
          >
            <Text style={[styles.toggleButtonText, { color: pickerMode === 'date' ? theme.primary : theme.accent }]}>Date</Text>
          </PressableOpacity>
          <PressableOpacity
            style={[styles.toggleButton, pickerMode === 'datetime' && { backgroundColor: theme.accent }]}
            onPress={() => setPickerMode('datetime')}
          >
            <Text style={[styles.toggleButtonText, { color: pickerMode === 'datetime' ? theme.primary : theme.accent }]}>Time</Text>
          </PressableOpacity>
        </View>
        {pickerMode === 'date' ? <DateTimePicker
          testID="datePicker"
          value={internalDate}
          mode={'date'}
          display={'inline'}
          onChange={handlePickerChange}
          accentColor={theme.accent}
        /> : <DateTimePicker
          testID="datetimePicker"
          value={internalDate}
          mode={'datetime'}
          display={'inline'}
          onChange={handlePickerChange}
          accentColor={theme.accent}
        />}
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50
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
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 5,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  toggleButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
})