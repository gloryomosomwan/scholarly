import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import Animated, { SharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FABProps = {
  isExpanded: SharedValue<boolean>
  index: number
  buttonLetter: string
}

const OFFSET = 60;
const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

export default function FAB({ isExpanded, index, buttonLetter }: FABProps) {
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
    <AnimatedPressable style={[animatedStyles, styles.shadow, styles.button]} onPress={() => console.log('pressed')}>
      <Animated.Text style={styles.content}>{buttonLetter}</Animated.Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#82cab2',
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
    color: '#f8f9ff',
    fontWeight: 500,
  },
});