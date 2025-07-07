import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { courses } from '@/data/data'
import { useRouter } from 'expo-router'

import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/PressableOpacity'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export default function CourseForm() {
  const theme = useTheme()
  const router = useRouter()

  const [title, setTitle] = useState('Add title')
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const [location, setLocation] = useState()
  const [course, setCourse] = useState()
  const [recurring, setRecurring] = useState()

  const datePickerModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    datePickerModalRef.current?.present();
  }, []);

  const handleSetStart = (date: Date) => {
    setStart(date)
  }

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, {}]}>
        <View style={[styles.formContainer, {}]}>
          <View style={[styles.fieldContainer, {}]}>
            <TextInput
              placeholder="Enter code"
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
            <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
            <PressableOpacity onPress={handlePresentModalPress}>
              {
                start === undefined
                  ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add date</Text>
                  : <Text style={[styles.detailText, { color: theme.grey500 }]}>{start.toLocaleString()}</Text>
              }
            </PressableOpacity>
          </View>
        </View>
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
              console.log()
              router.back()
            }}
            accessibilityLabel="Save"
          >
            <Text style={[styles.saveButtonText, { color: '#fff' }]}> Save </Text>
          </Pressable>
        </View>
        <DateTimeModal initialDate={start} handleSetDate={handleSetStart} bottomSheetModalRef={datePickerModalRef} />
      </View>
    </BottomSheetModalProvider>
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