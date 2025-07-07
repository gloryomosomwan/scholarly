import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'expo-router'

import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/PressableOpacity'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

export default function EventForm() {
  const theme = useTheme()
  const router = useRouter()

  const [title, setTitle] = useState('Add title')
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()

  const startDatePickerModalRef = useRef<BottomSheetModal>(null);
  const endDatePickerModalRef = useRef<BottomSheetModal>(null);

  const handleStartPress = useCallback(() => {
    Keyboard.dismiss()
    startDatePickerModalRef.current?.present();
  }, []);

  const handleEndPress = useCallback(() => {
    Keyboard.dismiss()
    endDatePickerModalRef.current?.present();
  }, []);

  const handleSetStart = (date: Date) => {
    setStart(date)
  }

  const handleSetEnd = (date: Date) => {
    setEnd(date)
  }

  return (
    <View style={[styles.container, {}]}>
      <View style={[styles.formContainer, {}]}>
        <View style={[styles.fieldContainer, {}]}>
          <TextInput
            placeholder="Add name"
            style={[styles.titleText, { color: theme.text }]}
            placeholderTextColor={theme.grey500}
            returnKeyType='done'
            multiline
            blurOnSubmit
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Start */}
        <View style={[styles.fieldContainer]}>
          <SymbolView name={'clock'} tintColor={theme.grey500} size={24} />
          <PressableOpacity onPress={handleStartPress}>
            {
              start === undefined
                ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add start date</Text>
                : <Text style={[styles.detailText, { color: theme.grey500 }]}>{start.toLocaleString()}</Text>
            }
          </PressableOpacity>
        </View>

        {/* End */}
        <View style={[styles.fieldContainer]}>
          <SymbolView name={'clock'} tintColor={theme.grey500} size={24} />
          <PressableOpacity onPress={handleEndPress}>
            {
              end === undefined
                ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add end date</Text>
                : <Text style={[styles.detailText, { color: theme.grey500 }]}>{end.toLocaleString()}</Text>
            }
          </PressableOpacity>
        </View>
      </View>

      {/* Button Row */}
      <View style={styles.buttonRowContainer}>
        <Pressable
          style={[styles.closeButton, { backgroundColor: '#eee' }]}
          onPress={() => {
            router.back()
          }}
          accessibilityLabel="Close"
        >
          <Text style={[styles.closeButtonText, { color: '#333' }]}> × </Text>
        </Pressable>
        <Pressable
          style={[styles.saveButton, { backgroundColor: '#007AFF' }]}
          onPress={() => {
            console.log('Title:', title, 'Start:', start, 'End:', end);
            router.back()
          }}
          accessibilityLabel="Save"
        >
          <Text style={[styles.saveButtonText, { color: '#fff' }]}> Save </Text>
        </Pressable>
      </View>

      {/* Date Pickers */}
      <DateTimeModal initialDate={start} handleSetDate={handleSetStart} bottomSheetModalRef={startDatePickerModalRef} />
      <DateTimeModal initialDate={end} handleSetDate={handleSetEnd} bottomSheetModalRef={endDatePickerModalRef} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  formContainer: {
    gap: 24,
  },
  fieldContainer: {
    flexDirection: 'row',
    gap: 16
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 8,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },

  courseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  courseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Button row
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  saveButton: {
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
})