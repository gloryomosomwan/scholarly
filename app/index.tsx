import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { useTheme } from '@/utils/useTheme'
import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/PressableOpacity'
import { DueType } from '@/types'
import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import PriorityItem from '@/components/Modals/Items/PriorityItem'
import CourseItem from '@/components/Modals/Items/CourseItem';

export default function EditActivity() {
  const theme = useTheme()
  const [date, setDate] = useState(new Date());
  const [addedDate, setAddedDate] = useState(false)
  const [dueType, setDueType] = useState<DueType>('date')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const courseSelectorModalRef = useRef<BottomSheetModal>(null);
  const prioritySelectorModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => { }, []);

  const handleSetDate = (date: Date, dueType: DueType) => {
    setDate(date)
    setAddedDate(true)
    setDueType(dueType)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Enter title"
          style={[styles.titleInput, { color: theme.text }]}
          placeholderTextColor={theme.grey500}
        />
        <PressableOpacity style={styles.detailRow} onPress={handlePresentModalPress}>
          <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
          {
            !addedDate
              ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add date</Text>
              : <Text style={[styles.detailText, { color: theme.grey500 }]}>{dueType === 'date' ? date.toLocaleDateString() : date.toLocaleString()}</Text>
          }
        </PressableOpacity>
        <PressableOpacity onPress={() => {
          Keyboard.dismiss()
          courseSelectorModalRef.current?.present()
        }}>
          <View style={styles.detailRow}>
            <SymbolView name={'bookmark'} tintColor={theme.grey500} size={24} />
            <Text style={[styles.detailText, { color: theme.grey500 }]}>Add course</Text>
          </View>
        </PressableOpacity>
        <PressableOpacity onPress={() => {
          Keyboard.dismiss()
          prioritySelectorModalRef.current?.present()
        }}>
          <View style={styles.detailRow}>
            <SymbolView name={'flag'} tintColor={theme.grey500} size={24} />
            <Text style={[styles.detailText, { color: theme.grey500 }]}>Add priority</Text>
          </View>
        </PressableOpacity>
        <View style={styles.detailRow}>
          <SymbolView name={'note.text'} tintColor={theme.grey500} size={24} />
          <Text style={[styles.detailText, { color: theme.grey500 }]}>Add notes</Text>
        </View>
      </View>
      <DateTimeModal initialDate={date} handleSetDate={handleSetDate} bottomSheetModalRef={bottomSheetModalRef} handleSheetChanges={handleSheetChanges} />
      <CustomBottomSheetModal bottomSheetModalRef={courseSelectorModalRef} scrollable showHandle={false}>
        <CourseItem code={'PHYS 102'} name={'Introduction to Physics'} color={'red'} />
      </CustomBottomSheetModal>
      <CustomBottomSheetModal bottomSheetModalRef={prioritySelectorModalRef}>
        <PriorityItem level={'high'} />
        <PriorityItem level={'medium'} />
        <PriorityItem level={'low'} />
      </CustomBottomSheetModal>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    gap: 10,
  },
  formContainer: {
    gap: 24,
  },
  titleInput: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
})