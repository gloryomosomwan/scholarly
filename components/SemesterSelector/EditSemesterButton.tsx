import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import { router } from 'expo-router'

type EditSemesterButtonProps = {
  translateX: SharedValue<number>
  semesterID: number
}

export default function EditSemesterButton({ translateX, semesterID }: EditSemesterButtonProps) {
  const theme = useTheme()

  // useAnimatedReaction(
  //   () => {
  //     return translateX.value;
  //   },
  //   (currentValue, previousValue) => {
  //     console.log(currentValue)
  //   }
  // );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      translateX.value < -80 ? 1 : 0
    )
  }))

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.grey100 }, animatedStyle]}>
      <PressableOpacity onPress={() => router.navigate({ pathname: '/semester-form', params: { id: semesterID } })}>
        <SymbolView name='pencil' tintColor={theme.grey400} />
      </PressableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    right: 30,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})