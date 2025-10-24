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
import { getCourseById } from '@/hooks/useDatabase';
import { checkCurrentEvent } from '@/utils/event';

type ScheduleItemCardProps = {
  item: Event | Test;
};

export default function ScheduleItemCard({ item }: ScheduleItemCardProps) {
  const theme = useTheme()
  const isCurrentEvent = checkCurrentEvent(item)
  const course = getCourseById(item.courseID ? item.courseID : null)
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]} >
      <View style={styles.topRowContainer}>
        {course && <Pill text={course.code} courseColor={course.color} />}
        <TimeRange startDate={item.startDate} endDate={item.endDate} isCurrentEvent={isCurrentEvent} />
      </View>
      <RelativeTime start={item.startDate} end={item.endDate} />
      <View style={styles.mainContentContainer}>
        <Header text={course ? (item.type !== 'test' ? item.type : item.name) : item.name} courseColor={course?.color} />
        {item.location && <Location location={item.location} courseColor={course?.color} />}
      </View>
      <View style={styles.progressSection}>
        <ProgressBar startDate={item.startDate} endDate={item.endDate} isCurrentEvent={isCurrentEvent} courseColor={course?.color} />
        {
          isCurrentEvent &&
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
