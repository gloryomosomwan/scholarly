import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withClamp, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/hooks'
import { Semester } from '@/types'

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import EditSemesterButton from '@/components/SemesterSelector/EditSemesterButton';

export type SemesterItemProps = {
  item: Semester
  onSelect?: (semester: { name: string }) => void
}

export default function SemesterItem({ item, onSelect }: SemesterItemProps) {
  const theme = useTheme()
  const translateX_SV = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX_SV.value = Math.max(e.translationX, -100)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: withClamp({ min: -100, max: 0 }, withSpring(translateX_SV.value, { mass: 0.75, damping: 90, stiffness: 200 }))
    }]
  }))

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle, { flex: 1 }]}>
          <PressableOpacity
            style={[styles.buttonContainer, { backgroundColor: theme.primary }]}
            onPress={() => onSelect?.({ name: item.name })}
          >
            <View style={styles.semesterInfoContainer}>
              <Text style={[styles.semesterNameText, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.semesterRangeText, { color: theme.grey500 }]}>
                {formatDate(item.start)} to {formatDate(item.end)}
              </Text>
            </View>
            <Text style={[styles.courseCountText, { color: theme.grey500 }]}>
              {4} courses
            </Text>
          </PressableOpacity>
        </Animated.View>
      </GestureDetector>
      <EditSemesterButton translateX={translateX_SV} semesterID={item.id} />
    </View>
  )
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 14,
    // flex: 1,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // elevation: 2,
  },
  semesterInfoContainer: {
    // flex: 1,
  },
  semesterNameText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  semesterRangeText: {
    fontSize: 14,
    fontWeight: '400',
  },
  courseCountText: {
    fontSize: 15,
    fontWeight: '500',
    // marginLeft: 4,
  },
})