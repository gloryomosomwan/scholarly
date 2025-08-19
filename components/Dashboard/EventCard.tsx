import React from 'react';
import { View, StyleSheet } from 'react-native';

import EventTypePill from '@/components/EventCard/EventTypePill';
import EventTimeRange from '@/components/EventCard/EventTimeRange';
import ProgressBar from '@/components/EventCard/ProgressBar';
import ProgressBarLabels from '@/components/EventCard/ProgressBarLabels';
import EventLocation from '@/components/EventCard/EventLocation';
import EventHeader from '@/components/EventCard/EventHeader';

import dayjs from '@/utils/dayjs'
import { useTheme } from '@/hooks';
import { Event } from '@/types';
import { getCourseById } from '@/hooks/useDatabase';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const theme = useTheme()
  const now = dayjs()
  const isCurrentEvent = now.isBetween(event.startDate, event.endDate)
  const course = getCourseById(event.courseID ? event.courseID : null)
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]} >
        <View style={styles.topRowContainer}>
          <EventTypePill type={event.type} courseColor={course?.color} />
          <EventTimeRange startDate={event.startDate} endDate={event.endDate} isCurrentEvent={isCurrentEvent} />
        </View>
        <View style={styles.mainContentContainer}>
          <EventHeader text={course?.code ? course.code : event.name} courseColor={course?.color} />
          <EventLocation location={event.location} courseColor={course?.color} />
        </View>
        <View style={styles.progressSection}>
          <ProgressBar startDate={event.startDate} endDate={event.endDate} isCurrentEvent={isCurrentEvent} courseColor={course?.color} />
          {
            isCurrentEvent &&
            <ProgressBarLabels startDate={event.startDate} endDate={event.endDate} />
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  card: {
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
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
