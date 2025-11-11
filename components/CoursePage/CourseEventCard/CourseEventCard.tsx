import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks';
import { Event } from '@/types';

import Icon from '@/components/CoursePage/CourseEventCard/Icon';
import Title from '@/components/CoursePage/CourseEventCard/Title';
import Time from '@/components/CoursePage/CourseEventCard/Time';
import Location from '@/components/CoursePage/CourseEventCard/Location';
import Recurrence from '@/components/CoursePage/CourseEventCard/Recurrence/Recurrence';
import Menu from '@/components/CoursePage/CourseEventCard/Menu';

export type CourseEventCardProps = {
  event: Event
};

export default function CourseEventCard({ event }: CourseEventCardProps) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
      <View style={styles.headerContainer}>
        <View style={styles.typeContainer}>
          <Icon eventType={event.type} />
          <Title eventType={event.type} />
        </View>
        <Menu eventID={event.id} />
      </View>
      <View style={styles.detailsContainer}>
        <Time start={event.startDate} end={event.endDate} />
        {event.recurring && <Recurrence recurrence={event.recurring} />}
        {event.location && <Location location={event.location} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {},
});