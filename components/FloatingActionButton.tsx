import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';
import Action from './Action';

type FloatingActionButtonProps = {

}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FloatingActionButton({ }: FloatingActionButtonProps) {
  const theme = useTheme()
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '45deg' : '0deg';

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  return (
    <SafeAreaView style={{ position: 'absolute', top: 200, left: 100, height: 400, width: 200, backgroundColor: 'red' }}>
      <View style={[styles.mainContainer, { backgroundColor: 'blue' }]}>
        <View style={[styles.buttonContainer, { backgroundColor: 'yellow' }]}>
          <AnimatedPressable
            onPress={handlePress}
            style={[styles.shadow, styles.button]}>
            <Animated.Text style={[plusIconStyle, styles.content, { backgroundColor: 'green' }]}>
              +
            </Animated.Text>
          </AnimatedPressable>
          <Action
            isExpanded={isExpanded}
            index={1}
            buttonLetter={'M'}
          />
          <Action
            isExpanded={isExpanded}
            index={2}
            buttonLetter={'W'}
          />
          <Action
            isExpanded={isExpanded}
            index={3}
            buttonLetter={'S'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: '#b58df1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 24,
    color: '#f8f9ff',
  },
  mainContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});