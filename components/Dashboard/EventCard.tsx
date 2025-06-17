import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols'

import dayjs from '@/utils/dayjs'
import { courseGradients } from '@/utils/Calendar/data';

type EventCardProps = {
  event: {
    type: string;
    course: string;
    emoji: string;
    location: string;
    start: Date;
    end: Date;
  };
};

export default function EventCard({ event }: EventCardProps) {
  const courseGradient = courseGradients[event.course as keyof typeof courseGradients];
  const now = dayjs()
  const isCurrentEvent = now.isBetween(event.start, event.end)
  const isUpNext = now.isBefore(event.start)
  let timeLeftString
  let timeFromNowString
  if (isCurrentEvent) {
    const timeLeft = dayjs(event.end).fromNow(true)
    timeLeftString = timeLeft + ' left'
  }
  if (isUpNext) {
    timeFromNowString = dayjs(event.start).fromNow()
    timeFromNowString = timeFromNowString.charAt(0).toUpperCase() + timeFromNowString.slice(1)
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // colors={[courseGradient[0], courseGradient[1]]}
        colors={['#EC4899', '#E11D48']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.leftContent}>
              <Text style={styles.eventType}>{event.type}</Text>
              <View style={styles.courseContainer}>
                <Text style={styles.courseEmoji}>{event.emoji}</Text>
                <Text style={styles.courseName}>{event.course}</Text>
              </View>
            </View>
            <View style={styles.rightContent}>
              <Text style={[styles.timeRange]}>{`${event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} - ${event.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}`}</Text>
              <Text style={styles.timeAgo}>
                {isCurrentEvent ? timeLeftString : timeFromNowString}
              </Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <SymbolView name={'mappin.circle.fill'} tintColor={'white'} style={styles.locationIcon} size={15} />
            <Text style={styles.locationText}>{event.location}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  eventType: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    opacity: 0.9,
    marginBottom: 6,
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseEmoji: {
    marginRight: 3,
    fontSize: 25
  },
  courseName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timeRange: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  timeAgo: {
    fontSize: 14,
    color: 'white',
    opacity: 0.7,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    opacity: 0.8,
    color: 'white',
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    opacity: 0.8,
  },
});