import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';
import Action from './Action';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type FloatingActionButtonProps = {

}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FloatingActionButton({ }: FloatingActionButtonProps) {
  const theme = useTheme()
  const isExpanded = useSharedValue(false);

  const { height, width } = Dimensions.get('window')
  const tabBarHeight = useBottomTabBarHeight();
  const buttonDiameter = 56

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
    <SafeAreaView style={{ position: 'absolute', top: height - tabBarHeight - (buttonDiameter / 2), right: 50 }}>
      <View style={[styles.mainContainer, {}]}>
        <View style={[styles.buttonContainer, {}]}>
          <AnimatedPressable
            onPress={handlePress}
            style={[styles.shadow, styles.button, { height: buttonDiameter, width: buttonDiameter, backgroundColor: theme.accent }]}>
            <Animated.Text style={[plusIconStyle, styles.content, {}]}>
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
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 28,
    color: '#f8f9ff',
  },
  mainContainer: {
    // position: 'relative',
    // height: 260,
    // width: '100%',
    // display: 'flex',
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