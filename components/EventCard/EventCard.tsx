import React from 'react';
import { View, StyleSheet } from 'react-native';

import EventPill from '@/components/EventCard/EventPill';
import EventTimeRange from '@/components/EventCard/EventTimeRange';
import ProgressBar from '@/components/EventCard/ProgressBar';
import ProgressBarLabels from '@/components/EventCard/ProgressBarLabels';
import EventLocation from '@/components/EventCard/EventLocation';
import EventHeader from '@/components/EventCard/EventHeader';
import RelativeTime from '@/components/EventCard/RelativeTime';

import { useTheme } from '@/hooks';
import { Event } from '@/types';
import { getCourseById } from '@/hooks/useDatabase';
import { checkCurrentEvent } from '@/utils/event';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const theme = useTheme()
  const isCurrentEvent = checkCurrentEvent(event)
  const course = getCourseById(event.courseID ? event.courseID : null)
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]} >
      <View style={styles.topRowContainer}>
        <EventPill text={course ? course.code : event.type} courseColor={course?.color} />
        <EventTimeRange startDate={event.startDate} endDate={event.endDate} isCurrentEvent={isCurrentEvent} />
      </View>
      <RelativeTime start={event.startDate} end={event.endDate} />
      <View style={styles.mainContentContainer}>
        <EventHeader text={course ? event.type : event.name} courseColor={course?.color} />
        <EventLocation location={event.location} courseColor={course?.color} />
      </View>
      <View style={styles.progressSection}>
        <ProgressBar startDate={event.startDate} endDate={event.endDate} recurrenceString={event.recurring} isCurrentEvent={isCurrentEvent} courseColor={course?.color} />
        {
          isCurrentEvent &&
          <ProgressBarLabels startDate={event.startDate} endDate={event.endDate} recurrenceString={event.recurring} />
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
