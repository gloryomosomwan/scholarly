import { Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { addMonths, differenceInCalendarMonths, isAfter, isBefore, isSameMonth, startOfMonth } from 'date-fns';
import InfinitePager, { InfinitePagerImperativeApi } from "react-native-infinite-pager";
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Month from '@/components/AgendaCalendar/Month'

import { useCalendarStore } from '@/stores/calendar';

type MonthPagerProps = {
  bottomSheetTranslationY: SharedValue<number>
  calendarBottom: SharedValue<number>
  selectedDatePosition: SharedValue<number>
}

export default function MonthPager({ bottomSheetTranslationY, calendarBottom, selectedDatePosition }: MonthPagerProps) {
  const currentDate = useCalendarStore((state) => state.currentDate)
  const previousDate = useCalendarStore((state) => state.previousDate)
  const todayDate = useCalendarStore((state) => state.todayDate)
  const monthPagerRef = useRef<InfinitePagerImperativeApi>(null)
  const insets = useSafeAreaInsets()
  const pagerOpacity = useSharedValue(1)
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top

  const isProgrammaticChange = useSharedValue(false)
  const didInitialSync = useRef<boolean>(false)
  const changeMadeByMe = useRef<boolean>(false)

  const setCalendarBottom = (y: number) => {
    calendarBottom.value = y
  }

  const animatedProps = useAnimatedProps(() => {
    return {
      pointerEvents: (isProgrammaticChange.value ? 'none' : 'auto') as 'none' | 'auto',
    };
  });

  useEffect(() => {
    if (isSameMonth(previousDate, currentDate)) {
      return;
    }

    if (changeMadeByMe.current === true) {
      changeMadeByMe.current = false
      return;
    }

    isProgrammaticChange.value = true;

    const monthDifference = differenceInCalendarMonths(currentDate, previousDate);
    if (monthDifference === 1) {
      monthPagerRef.current?.incrementPage({ animated: true });
    }
    else if (monthDifference === -1) {
      monthPagerRef.current?.decrementPage({ animated: true });
    }
    else {
      monthPagerRef.current?.setPage(differenceInCalendarMonths(currentDate, todayDate), { animated: false });
    }
  }, [currentDate, previousDate, todayDate])

  const rMonthPagerStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: interpolate(
          bottomSheetTranslationY.value,
          [calendarBottom.value, calendarBottom.value - 235],
          [0, (paddingTop + 52) - selectedDatePosition.value], // 52 to get us under the header (header has a height of 52)
          Extrapolate.CLAMP
        )
      }],
      opacity: pagerOpacity.value,
      pointerEvents: bottomSheetTranslationY.value === calendarBottom.value - 235 ? 'none' : 'auto',
      zIndex: bottomSheetTranslationY.value === calendarBottom.value - 235 ? -1 : 0,
    };
  });


  const rPageStyle = useAnimatedStyle(() => {
    return {
      opacity: bottomSheetTranslationY.value === calendarBottom.value - 235 ? 0 : 1
    }
  })

  const MonthPage = ({ index }: { index: number }) => {
    return (
      <Animated.View style={[rPageStyle]} >
        <Month
          initialDay={startOfMonth(addMonths(todayDate, index))}
          selectedDatePosition={selectedDatePosition}
          setCalendarBottom={setCalendarBottom}
        />
      </Animated.View>
    );
  };

  return (
    <View style={{ overflow: 'hidden', top: 52 }}>
      <Animated.View style={[rMonthPagerStyle]} animatedProps={animatedProps}>
        <InfinitePager
          ref={monthPagerRef}
          PageComponent={MonthPage}
          onPageChange={(index) => {
            if (didInitialSync.current === false) {
              didInitialSync.current = true;
              return;
            }
            if (isProgrammaticChange.value === true) {
              isProgrammaticChange.value = false;
              return;
            }
            changeMadeByMe.current = true
            const currentGlobalDate = useCalendarStore.getState().currentDate
            const globalTodayDate = useCalendarStore.getState().todayDate;
            let date = index === 0 ? globalTodayDate : startOfMonth(addMonths(globalTodayDate, index))
            useCalendarStore.getState().selectPreviousDate(currentGlobalDate);
            useCalendarStore.getState().monthSelectDate(date);
          }}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({})