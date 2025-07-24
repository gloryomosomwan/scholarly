import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Keyboard, ActionSheetIOS } from 'react-native'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { router, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import DateTimeModal from '@/components/Modals/DateTimeModal'
import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import PriorityItem from '@/components/Modals/Items/PriorityItem'
import CourseItem from '@/components/Modals/Items/CourseItem';

import { useTheme, usePriorityPalette } from '@/hooks'
import { Activity, DueType } from '@/types/types'
import { courses } from '@/data/data'
import { db } from '@/db/init'
import { tasks } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default function ActivityForm() {
  const theme = useTheme();

  let data = null;
  const { id } = useLocalSearchParams<{ id: string }>()
  let convertedID = Number(id)
  if (id) {
    const sqlite = useSQLiteContext()
    data = sqlite.getFirstSync<Activity>(`
      SELECT 
      id,
      title,
      course,
      due,
      due_type as dueType,
      description,
      priority,
      completed_at as completedAt
      FROM tasks
      WHERE id = ${convertedID}`)
  }

  const [date, setDate] = useState<Date | null>(data?.due ? new Date(data.due) : null);
  const [dueType, setDueType] = useState<DueType | null>(data?.dueType ? data.dueType : null);
  const [course, setCourse] = useState<string | null>(data?.course ? data.course : null);
  const [priority, setPriority] = useState<string | null>(data?.priority ? data.priority : null);
  const [title, setTitle] = useState(data?.title ? data.title : '')
  const [notes, setNotes] = useState(data?.description ? data.description : '')

  const datePickerModalRef = useRef<BottomSheetModal>(null);
  const courseSelectorModalRef = useRef<BottomSheetModal>(null);
  const prioritySelectorModalRef = useRef<BottomSheetModal>(null);

  const priorityPalette = usePriorityPalette(priority)

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    datePickerModalRef.current?.present();
  }, []);


  const handleSetDate = (date: Date, dueType: DueType) => {
    setDate(date)
    setDueType(dueType)
  }

  const createTask = async () => {
    if (title !== '') {
      await db.insert(tasks).values({
        title: title,
        course: course,
        description: notes,
        due: date ? date.toISOString() : null,
        dueType: dueType,
        priority: priority,
        completedAt: null
      })
      router.back()
    }
  }

  const updateTask = async () => {
    if (title !== '' && id !== null) {
      await db.update(tasks).set({
        title: title,
        course: course,
        description: notes,
        due: date ? date.toISOString() : null,
        dueType: dueType,
        priority: priority,
        completedAt: null
      })
        .where(eq(tasks.id, convertedID));
      router.back()
    }
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete task'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(tasks).where(eq(tasks.id, convertedID))
          router.back()
        }
      }
    )
  }

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { backgroundColor: theme.secondary }]}>
        <View style={styles.formContainer}>

          {/* Title */}
          <TextInput
            placeholder="Enter title"
            style={[styles.titleInput, { color: theme.text }]}
            placeholderTextColor={theme.grey500}
            returnKeyType='done'
            multiline
            blurOnSubmit
            value={title}
            onChangeText={setTitle}
          />

          {/* Datetime */}
          <PressableOpacity style={styles.detailRow} onPress={handlePresentModalPress}>
            <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
            {
              !date
                ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add date</Text>
                : <Text style={[styles.detailText, { color: theme.grey500 }]}>{dueType === 'date' ? date.toLocaleDateString() : date.toLocaleString()}</Text>
            }
          </PressableOpacity>

          {/* Course */}
          <PressableOpacity onPress={() => {
            Keyboard.dismiss()
            courseSelectorModalRef.current?.present()
          }}>
            <View style={styles.detailRow}>
              <SymbolView name={'bookmark'} tintColor={theme.grey500} size={24} />
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
                :
                <Text style={[styles.detailText, { color: theme.grey500 }]}>Add course</Text>
              }
            </View>
          </PressableOpacity>

          {/* Priority */}
          <PressableOpacity onPress={() => {
            Keyboard.dismiss()
            prioritySelectorModalRef.current?.present()
          }}>
            <View style={styles.detailRow}>
              <SymbolView name={'flag'} tintColor={theme.grey500} size={24} />
              {priority ?
                (() => {
                  return (
                    <View style={[styles.priorityTag, { backgroundColor: priorityPalette.backgroundColor }]}>
                      <Text style={[styles.priorityText, { color: priorityPalette.color }]}>
                        {priority.toUpperCase()}
                      </Text>
                    </View>
                  )
                })()
                :
                <Text style={[styles.detailText, { color: theme.grey500 }]}>Add priority</Text>
              }
            </View>
          </PressableOpacity>

          {/* Notes */}
          <View style={styles.detailRow}>
            <SymbolView name={'note.text'} tintColor={theme.grey500} size={24} />
            <TextInput
              placeholder="Add notes"
              style={[styles.detailText, { color: theme.text, flex: 1 }]}
              placeholderTextColor={theme.grey500}
              multiline
              returnKeyType='done'
              blurOnSubmit
              value={notes}
              onChangeText={setNotes}
            />
          </View>

        </View>

        {/* Button Row */}
        <View style={[styles.buttonContainer, {}]}>
          {
            id !== undefined &&
            <PressableOpacity onPress={confirmDelete}>
              <Text style={[styles.buttonText, { color: theme.dangerText }]}>Delete</Text>
            </PressableOpacity>
          }
          <PressableOpacity onPress={id !== undefined ? updateTask : createTask} disabled={title.length > 0 ? false : true}>
            <Text style={[styles.buttonText, { color: title.length > 0 ? theme.accent : theme.accentInactive }]}>Save</Text>
          </PressableOpacity>
        </View>

        {/* Date Picker */}
        <DateTimeModal initialDate={new Date()} handleSetDate={handleSetDate} bottomSheetModalRef={datePickerModalRef} />

        {/* Course Modal */}
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

        {/* Priority Selector */}
        <CustomBottomSheetModal bottomSheetModalRef={prioritySelectorModalRef} showHandle={false}>
          <PriorityItem level={'high'} onSelect={() => {
            setPriority('high')
            prioritySelectorModalRef.current?.dismiss()
          }} />
          <PriorityItem level={'medium'} onSelect={() => {
            setPriority('medium')
            prioritySelectorModalRef.current?.dismiss()
          }} />
          <PriorityItem level={'low'} onSelect={() => {
            setPriority('low')
            prioritySelectorModalRef.current?.dismiss()
          }} />
        </CustomBottomSheetModal>

      </View >
    </BottomSheetModalProvider>
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
    alignItems: 'flex-start',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
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
  priorityTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
})