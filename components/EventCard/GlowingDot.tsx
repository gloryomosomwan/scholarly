import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/hooks/useTheme'

type GlowingDotProps = {

}

export default function GlowingDot({ }: GlowingDotProps) {
  const theme = useTheme()
  const radius = useSharedValue(10)
  const opacity = useSharedValue(0.75)

  useEffect(() => {
    radius.value = withRepeat(withTiming(25, { duration: 1000 }), -1)
    opacity.value = withRepeat(withTiming(0, { duration: 1000 }), -1)
  })

  const animatedStyles = useAnimatedStyle(() => ({
    width: radius.value,
    height: radius.value,
    opacity: opacity.value
  }))

  return (
    <View style={[styles.container, {}]}>
      <Animated.View style={[styles.glow, animatedStyles]} />
      <View style={styles.dot} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  glow: {
    marginTop: 13,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  dot: {
    backgroundColor: 'green',
    borderRadius: 10,
    width: 10,
    height: 10,
    position: 'absolute',
    zIndex: 1
  }
})