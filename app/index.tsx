import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/utils/useTheme'
import DateTimeModal from '@/components/DateTimeModal'
import PressableOpacity from '@/components/PressableOpacity'

export default function editActivity() {
  const theme = useTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [date, setDate] = useState(new Date());
  const [addedDate, setAddedDate] = useState(false)

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => { }, []);

  const handleSetDate = (date: Date) => {
    setDate(date)
    setAddedDate(true)
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
            !addedDate ?
              <Text style={[styles.detailText, { color: theme.grey500 }]}>Add date</Text>
              :
              <Text style={[styles.detailText, { color: theme.grey500 }]}>{date.toLocaleDateString()}</Text>
          }
        </PressableOpacity>
        <View style={styles.detailRow}>
          <SymbolView name={'bookmark'} tintColor={theme.grey500} size={24} />
          <Text style={[styles.detailText, { color: theme.grey500 }]}>Add course</Text>
        </View>
        <View style={styles.detailRow}>
          <SymbolView name={'flag'} tintColor={theme.grey500} size={24} />
          <Text style={[styles.detailText, { color: theme.grey500 }]}>Add priority</Text>
        </View>
        <View style={styles.detailRow}>
          <SymbolView name={'note.text'} tintColor={theme.grey500} size={24} />
          <Text style={[styles.detailText, { color: theme.grey500 }]}>Add notes</Text>
        </View>
      </View>
      <DateTimeModal initialDate={date} handleSetDate={handleSetDate} bottomSheetModalRef={bottomSheetModalRef} handleSheetChanges={handleSheetChanges} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
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