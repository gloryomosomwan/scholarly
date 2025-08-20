import { Platform, Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { isSameDay } from 'date-fns'
import tinycolor from 'tinycolor2'
import { SymbolView } from 'expo-symbols'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks'
import { useCalendarStore } from '@/stores/CalendarState'

type TodayButtonProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function TodayButton({ bottomSheetTranslationY, calendarBottom }: TodayButtonProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top

  const { currentDate, selectToday, todayDate } = useCalendarStore()
  const todayIsCurrent = isSameDay(currentDate, todayDate)

  const todayButtonStyle = useAnimatedStyle(() => {
    let opacity;
    const fadeOut = withTiming(0, { duration: 100 })
    const fadeIn = withTiming(1, { duration: 100 })
    todayIsCurrent ? opacity = fadeOut : opacity = fadeIn
    return {
      opacity: opacity,
      pointerEvents: bottomSheetTranslationY.value === calendarBottom.value - 235 || bottomSheetTranslationY.value === calendarBottom.value ? "auto" : "none"
    }
  })

  return (
    <Animated.View style={[todayButtonStyle, styles.container, { top: paddingTop }]}>
      <Pressable onPress={selectToday} style={({ pressed }) => [
        styles.buttonContainer,
        { backgroundColor: tinycolor(theme.accent).setAlpha(0.15).toRgbString() },
        pressed && { opacity: 0.9 }
      ]}>
        <SymbolView name="arrow.uturn.backward" style={styles.icon} size={12} type="monochrome" tintColor={theme.accent} />
        <Text style={[styles.text, { color: theme.accent }]}>{'TODAY'}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    right: 20,
    justifyContent: 'center',
    height: 30,
  },
  buttonContainer: {
    height: 20,
    width: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 12,
  },
  icon: {
    marginRight: 4
  },
})