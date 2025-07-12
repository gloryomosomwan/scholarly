import { Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { addWeeks, differenceInCalendarWeeks, isSameWeek, setDay, startOfWeek } from 'date-fns';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCalendarStore } from '@/stores/CalendarState';
import Week from './Week';

type WeekPagerProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
}

export default function WeekPager({ bottomSheetTranslationY, calendarBottom }: WeekPagerProps) {
  const { currentDate, previousDate, todayDate } = useCalendarStore();
  const weekPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const pagerOpacity = useSharedValue(1)
  const isProgrammaticChange = useSharedValue(false)
  const didInitialSync = useRef<boolean>(false)
  const changeMadeByMe = useRef<boolean>(false)

  useEffect(() => {
    if (isSameWeek(previousDate, currentDate)) {
      return;
    }
    if (changeMadeByMe.current === true) {
      changeMadeByMe.current = false
      return;
    }
    isProgrammaticChange.value = true;
    weekPagerRef.current?.setPage(differenceInCalendarWeeks(currentDate, todayDate), { animated: false })
  }, [currentDate, previousDate, todayDate])

  const rWeekPagerStyle = useAnimatedStyle(() => {
    return {
      // opacity: pagerOpacity.value,
      pointerEvents: bottomSheetTranslationY.value === calendarBottom.value - 235 ? 'auto' : 'none'
    }
  })

  const rPageStyle = useAnimatedStyle(() => {
    return {
      // opacity: bottomSheetTranslationY.value === calendarBottom.value - 235 ? 1 : 0
    }
  })

  const WeekPage = ({ index }: { index: number }) => {
    const selectedDatePosition = useSharedValue(0)
    return (
      <Animated.View style={[rPageStyle]} >
        <Week
          initialDay={startOfWeek(addWeeks(todayDate, index))}
          selectedDatePosition={selectedDatePosition}
        />
      </Animated.View>
    );
  };
  return (
    <Animated.View style={[styles.weekPagerContainer, { top: paddingTop + 52 }, rWeekPagerStyle]}>
      {/* top = 20 (top inset/paddingTop) + 30 (size of header) + 5 (header margin) + 17 (weekday name text height) */}
      <InfinitePager
        ref={weekPagerRef}
        PageComponent={WeekPage}
        onPageChange={(index) => {
          if (didInitialSync.current === false) {
            didInitialSync.current = true;
            return;
          }
          if (isProgrammaticChange.value === true) {
            isProgrammaticChange.value = false;
            return;
          }
          console.log('i hate LLMs.')
          changeMadeByMe.current = true
          const currentGlobalDate = useCalendarStore.getState().currentDate;
          const globalTodayDate = useCalendarStore.getState().todayDate;
          const dayOfPreviousWeek = currentGlobalDate.getDay();
          let date = index === 0 ? globalTodayDate : setDay(addWeeks(globalTodayDate, index), dayOfPreviousWeek);
          useCalendarStore.getState().selectPreviousDate(currentGlobalDate);
          useCalendarStore.getState().weekSelectDate(date);
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  weekPagerContainer: {
    position: 'absolute',
    zIndex: 1
  }
})