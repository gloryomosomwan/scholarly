import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import Animated, { SharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { ExternalPathString, RelativePathString, Route, router } from 'expo-router';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FABProps = {
  isExpanded: SharedValue<boolean>
  index: number
  text: string
  route: Route
}

const OFFSET = 60;
const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

export default function FAB({ isExpanded, index, text, route }: FABProps) {
  const theme = useTheme()
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  })


  return (
    <AnimatedPressable style={[animatedStyles, styles.shadow, styles.button, { backgroundColor: theme.primary }]} onPress={() => router.navigate(route)}>
      <Animated.Text style={[styles.content, { color: theme.accent }]}>{text}</Animated.Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    width: 'auto',
    height: 40,
    position: 'absolute',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -2,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    fontWeight: 500,
  },
});