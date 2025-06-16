import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

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
  const isUpNext = false;

  let timeLeftString
  if (isCurrentEvent) {
    const timeLeft = dayjs(event.end).fromNow(true)
    timeLeftString = timeLeft + ' left'
  }

  const timeFromNowString = dayjs(event.start).fromNow()
  const capitalizedTimeToNowString = timeFromNowString.charAt(0).toUpperCase() + timeFromNowString.slice(1)

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[courseGradient[0], courseGradient[1]]}
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
              <Text style={styles.timeAgo}>{timeLeftString}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <View style={styles.locationDot} />
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
    color: '#FECACA',
    marginBottom: 4,
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
    fontSize: 24,
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
    color: '#FECACA',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F9A8D4',
  },
  locationText: {
    fontSize: 14,
    color: '#FECACA',
  },
});

const formatTime = (time: Date) => {
  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const formatTimeRange = (start: Date, end: Date) => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
};