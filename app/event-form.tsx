import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { courses } from '@/data/data'
import { useRouter } from 'expo-router'

import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import CourseItem from '@/components/Modals/Items/CourseItem'

export default function EventForm() {
  const theme = useTheme()
  const router = useRouter()

  const [title, setTitle] = useState('Add title')
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const [location, setLocation] = useState('')
  const [course, setCourse] = useState('')
  const [recurring, setRecurring] = useState(false)

  const startDatePickerModalRef = useRef<BottomSheetModal>(null);
  const endDatePickerModalRef = useRef<BottomSheetModal>(null);
  const courseSelectorModalRef = useRef<BottomSheetModal>(null)

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

          {/* Location */}
          <View style={styles.fieldContainer}>
            <SymbolView name={'mappin.circle.fill'} tintColor={theme.grey500} size={24} />
            <TextInput
              placeholder="Add location"
              style={[styles.detailText, { color: theme.text, flex: 1 }]}
              placeholderTextColor={theme.grey500}
              multiline
              returnKeyType='done'
              blurOnSubmit
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Course */}
          <PressableOpacity onPress={() => {
            Keyboard.dismiss()
            courseSelectorModalRef.current?.present()
          }}>
            <View style={styles.fieldContainer}>
              <SymbolView name={'graduationcap.fill'} tintColor={theme.grey500} size={24} />
              {course ?
                (() => {
                  const selected = courses.find(c => c.code === course)
                  return (
                    <View style={[styles.courseTag, { backgroundColor: theme.grey100 }]}>
                      <View style={[styles.courseDot, { backgroundColor: selected?.color ?? 'grey' }]} />
                      <Text style={[styles.courseText, { color: theme.text }]}>{course}</Text>
                    </View>
                  )
                })()
                : <Text style={[styles.detailText, { color: theme.grey500 }]}>Add course</Text>
              }
            </View>
          </PressableOpacity>

          {/* Recurring Event */}
          <View style={[styles.fieldContainer, { justifyContent: 'space-between' }]}>
            <PressableOpacity onPress={() => router.push('/recurrence-modal')}>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
                <Text style={[styles.detailText, { color: theme.grey500 }]}>Repeat</Text>
              </View>
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
              console.log('Title:', title, 'Start:', start, 'End:', end, 'Location:', location, 'Course:', course, 'Recurring:', recurring);
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

        {/* Course Selector */}
        <CustomBottomSheetModal bottomSheetModalRef={courseSelectorModalRef} scrollable>
          {courses.map(course => (
            <CourseItem
              key={course.code}
              code={course.code}
              name={course.name ?? ''}
              color={course.color}
              onSelect={({ code }) => {
                setCourse(code)
                courseSelectorModalRef.current?.dismiss()
              }}
            />
          ))}
        </CustomBottomSheetModal>
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