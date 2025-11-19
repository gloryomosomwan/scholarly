import { Dimensions, Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { useTheme } from '@/hooks/useTheme'

import Action from '@/components/FloatingActionButton/Action'

type PlusIconProps = {}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PlusIcon({ }: PlusIconProps) {
  const theme = useTheme()

  const { height, width } = Dimensions.get('window')
  const tabBarHeight = useBottomTabBarHeight();
  const buttonDiameter = 60
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
    <View style={[styles.buttonContainer, { backgroundColor: theme.accent, height: buttonDiameter, borderRadius: buttonDiameter / 2, width: buttonDiameter, top: height - tabBarHeight - (buttonDiameter + 20), left: width - (buttonDiameter + 18) }]}>
      <AnimatedPressable
        onPress={handlePress}
        style={[styles.shadow, styles.button]}>
        <Animated.Text style={[plusIconStyle, styles.content]}>
          +
        </Animated.Text>
      </AnimatedPressable>
      <Action
        isExpanded={isExpanded}
        index={1}
        text={'Task'}
        route={'/task-form'}
      />
      <Action
        isExpanded={isExpanded}
        index={2}
        text={'Event'}
        route={'/event-form'}
      />
    </View>
    // <SafeAreaView onLayout={(ev) => {
    //   console.log(ev.nativeEvent.layout)
    // }}>
    //   <View style={styles.mainContainer}>
    //   </View>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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
    top: 400,
    left: 100,
    zIndex: 2 // CHECK: why does this need to be 3 for the Actions to be pressable?
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    zIndex: 1,
    height: 56,
    width: 56,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 24,
    color: '#f8f9ff',
  },
});