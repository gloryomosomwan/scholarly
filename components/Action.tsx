import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, withSpring, withDelay, withTiming, SharedValue } from 'react-native-reanimated';
import { Href, router } from 'expo-router';

import { useTheme } from '@/hooks/useTheme'

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ActionProps = {
  isExpanded: SharedValue<boolean>
  index: number
  text: string
  href: Href
}

export default function Action({ isExpanded, index, text, href }: ActionProps) {
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
  });

  return (
    <AnimatedPressable style={[animatedStyles, styles.shadow, styles.button, { backgroundColor: theme.accent }]} onPress={() => router.navigate(href)}>
      <Animated.Text style={styles.content}>{text}</Animated.Text>
    </AnimatedPressable>
  );

}

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    paddingHorizontal: 8,
    height: 40,
    position: 'absolute',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -0,
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