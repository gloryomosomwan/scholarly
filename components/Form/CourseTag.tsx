import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'


import { useTheme } from '@/hooks'
import { useCourseById } from '@/hooks/useDatabase'

type CourseTagProps = {
  courseID: number | null
}

export default function CourseTag({ courseID }: CourseTagProps) {
  const theme = useTheme()
  const course = useCourseById(courseID)
  return (
    <View>
      <View style={styles.row}>
        <SymbolView name={'graduationcap.fill'} tintColor={theme.grey500} size={24} />
        {course &&
          <View style={styles.field}>
            <View style={[styles.tag, { backgroundColor: theme.grey100 }]}>
              <View style={[styles.dot, { backgroundColor: course.color ?? 'grey' }]} />
              <Text style={[styles.courseText, { color: theme.text }]}>{course.code}</Text>
            </View>
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '500',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
})