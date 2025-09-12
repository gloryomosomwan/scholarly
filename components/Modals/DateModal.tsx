import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import PressableOpacity from '@/components/Buttons/PressableOpacity';

import { useTheme } from '@/hooks'
import { addMonths } from 'date-fns';

type DateModalProps = {
  dateType: string
  bottomSheetModalRef: RefObject<BottomSheetModal>
  initialDate: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function DateModal({ initialDate, setDate, dateType, bottomSheetModalRef }: DateModalProps) {
  const theme = useTheme()
  let day = new Date()
  if (dateType === 'end') day = addMonths(day, 4)
  const [internalDate, setInternalDate] = useState(initialDate === null ? day : initialDate)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || internalDate;
    setInternalDate(currentDate)
  };

  function saveDate() {
    internalDate.setUTCSeconds(0, 0)
    setDate(internalDate)
    bottomSheetModalRef.current?.dismiss()
  }

  const BottomSheetHandle = () => {
    return (
      <View style={[styles.bottomSheetHandle, { backgroundColor: theme.primary }]}>
        <PressableOpacity style={[styles.doneButton]} onPress={saveDate}>
          <Text style={[styles.doneText, { color: theme.accent }]}>Done</Text>
        </PressableOpacity>
      </View>
    )
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={{ backgroundColor: theme.primary }}
      handleComponent={() => <BottomSheetHandle />}
      snapPoints={['60%']}
      enableDynamicSizing={false}
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
        <Text>{internalDate.toISOString()}</Text>
        <DateTimePicker
          testID="datePicker"
          value={internalDate}
          mode={'date'}
          display={'inline'}
          onChange={handlePickerChange}
          accentColor={theme.accent}
        />
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
})