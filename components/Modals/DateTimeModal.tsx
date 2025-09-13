import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import PressableOpacity from '@/components/Buttons/PressableOpacity';

import { useTheme } from '@/hooks'

type DateTimeModalProps = {
  dateType: string
  bottomSheetModalRef: RefObject<BottomSheetModal>
  initialDate: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function DateTimeModal({ initialDate, setDate, dateType, bottomSheetModalRef }: DateTimeModalProps) {
  const theme = useTheme()
  // let roundedDate = roundToNearestHours(new Date(), { roundingMethod: 'ceil' })
  // if (dateType === 'end') roundedDate = addHours(roundedDate, 1)
  const [internalDate, setInternalDate] = useState(initialDate)

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
        <Text style={{ color: theme.text }}>{internalDate.toISOString()}</Text>
        <DateTimePicker
          testID="datePicker"
          value={internalDate}
          mode={'date'}
          display={'inline'}
          onChange={handlePickerChange}
          accentColor={theme.accent}
        />
        <View style={styles.timeRow}>
          <Text style={[styles.timeLabelText, { color: theme.text }]}>Time</Text>
          <DateTimePicker
            testID="timePicker"
            value={internalDate}
            mode={'time'}
            display={'inline'}
            onChange={handlePickerChange}
            accentColor={theme.accent}
          />
        </View>
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
  timeRow: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeLabelText: {
    fontWeight: '500',
    fontSize: 17
  }
})