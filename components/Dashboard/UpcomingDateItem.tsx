import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'

import { useTheme } from '@/hooks/useTheme'
import { Test } from '@/types'
import { useCourseById } from '@/hooks/useDatabase'
import { getColorWithOpacity } from '@/utils'

type UpcomingDateItemProps = {
  item: Test
}

export default function UpcomingDateItem({ item }: UpcomingDateItemProps) {
  const theme = useTheme()
  const course = useCourseById(item.courseID ? item.courseID : null)
  return (
    <View style={styles.container}>
      <View style={[styles.leftSide, {}]}>
        <View style={[styles.codeBackground, { backgroundColor: course?.color ? getColorWithOpacity(course.color, 0.25) : theme.grey200 }]}>
          <Text style={[styles.codeText, { color: course?.color ?? theme.grey400 }]}>{course?.code}</Text>
        </View>
        <Text style={[styles.titleText, { color: theme.grey600 }]}>{item.name}</Text>
      </View>
      <Text style={[styles.dateText, { color: theme.grey400 }]}>{dayjs(item.startDate).fromNow()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeBackground: {
    alignItems: 'center',
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 20,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 13
  },
  codeText: {
    fontWeight: '500',
    fontSize: 12
  },
  dateText: {
    fontSize: 12
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})