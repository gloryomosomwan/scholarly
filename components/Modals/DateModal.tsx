import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addMonths, startOfDay } from 'date-fns';

import PressableOpacity from '@/components/Buttons/PressableOpacity';

import { useTheme } from '@/hooks'

type DateModalProps = {
  dateType: string
  bottomSheetModalRef: RefObject<BottomSheetModal>
  initialDate: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  form: string
}

export default function DateModal({ initialDate, setDate, dateType, bottomSheetModalRef, form }: DateModalProps) {
  const theme = useTheme()
  let day = startOfDay(new Date()) // TODO: rename this
  if (dateType === 'end' && form === 'semester') day = addMonths(day, 4)
  const [internalDate, setInternalDate] = useState(initialDate === null ? day : initialDate)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || internalDate;
    setInternalDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), initialDate?.getHours() || 0, initialDate?.getMinutes() || 0))
  };

  function saveDate() {
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
      snapPoints={['50%']}
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
        <Text style={{ color: theme.text }}>{internalDate.toISOString()}</Text>
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