import React from 'react';
import { View, StyleSheet } from 'react-native';

import Pill from '@/components/Dashboard/ScheduleItemCard/Pill';
import TimeRange from '@/components/Dashboard/ScheduleItemCard/TimeRange';
import ProgressBar from '@/components/Dashboard/ScheduleItemCard/ProgressBar';
import ProgressBarLabels from '@/components/Dashboard/ScheduleItemCard/ProgressBarLabels';
import Location from '@/components/Dashboard/ScheduleItemCard/Location';
import Header from '@/components/Dashboard/ScheduleItemCard/Header';
import RelativeTime from '@/components/Dashboard/ScheduleItemCard/RelativeTime';

import { useTheme } from '@/hooks';
import { Event, Test } from '@/types';
import { useCourseById } from '@/hooks/useDatabase';
import { checkIsHappening } from '@/utils/scheduleItem';

type ScheduleItemCardProps = {
  item: Event | Test;
};

export default function ScheduleItemCard({ item }: ScheduleItemCardProps) {
  const theme = useTheme()
  const isHappening = checkIsHappening(item)
  const course = useCourseById(item.courseID ? item.courseID : null)
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]} >
      <View style={styles.topRowContainer}>
        {course && <Pill text={course.code} courseColor={course.color} />}
        <TimeRange startDate={item.startDate} endDate={item.endDate} isHappening={isHappening} />
      </View>
      <RelativeTime start={item.startDate} end={item.endDate} />
      <View style={styles.mainContentContainer}>
        <Header isCourseEvent={course !== null && item.type !== 'general' && item.type !== 'test'} hasCourse={course !== null} title={item.name} type={item.type} courseColor={course?.color} />
        {item.location && <Location location={item.location} courseColor={course?.color} />}
      </View>
      <View style={styles.progressSection}>
        <ProgressBar startDate={item.startDate} endDate={item.endDate} isHappening={isHappening} courseColor={course?.color} />
        {
          isHappening &&
          <ProgressBarLabels startDate={item.startDate} endDate={item.endDate} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderWidth: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 32,
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // marginBottom: 16,
  },
  mainContentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  progressSection: {
    marginTop: 8,
  },
});
