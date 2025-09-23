import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/hooks/useTheme'

type EditSemesterButtonProps = {
  translateX: SharedValue<number>
}

export default function EditSemesterButton({ translateX }: EditSemesterButtonProps) {
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
      translateX.value < -50 ? 1 : 0
    )
  }))

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.grey100 }, animatedStyle]}>
      <SymbolView name='pencil' tintColor={theme.grey400} />
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
    zIndex: 11,
    justifyContent: 'center',
    alignItems: 'center',
  }
})