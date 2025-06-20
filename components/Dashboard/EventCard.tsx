import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

import dayjs from '@/utils/dayjs'
import { formatTime, getColorWithOpacity } from '@/utils/utility'
import { courseColors } from '@/utils/Calendar/data';
import { useTheme } from '@/utils/useTheme';

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
  const { type, course, emoji, location, start, end } = event;
  const theme = useTheme()
  const courseColor = courseColors[event.course as keyof typeof courseColors]

  const now = new Date();
  const totalDuration = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const remaining = end.getTime() - now.getTime();

  const nowDayJS = dayjs()
  const isCurrentEvent = nowDayJS.isBetween(event.start, event.end)
  const isUpNext = nowDayJS.isBefore(event.start)
  let timeFromNowString
  if (isUpNext) {
    timeFromNowString = dayjs(event.start).fromNow()
    timeFromNowString = timeFromNowString.charAt(0).toUpperCase() + timeFromNowString.slice(1)
  }

  const progressPercentage = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

  const formatRemainingTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m left`;
    }
    return `${remainingMinutes} minutes left`;
  };

  const formatElapsedTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m elapsed`;
    }
    return `${remainingMinutes}m elapsed`;
  };

  return (
    <View style={styles.container}>

      <View style={[styles.card, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]} >
        {/* Header */}
        <View style={styles.topRowContainer}>
          <View style={[styles.eventTypeBackground, { backgroundColor: courseColor }]}>
            <Text style={[styles.eventTypeText, { color: '#FFF' }]}>{type}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={[styles.timeRangeText, { color: theme.text }]}>
              {formatTime(start)} - {formatTime(end)}
            </Text>
            <Text style={[styles.timeAgoText, { color: theme.text }]}>
              {!isCurrentEvent && timeFromNowString}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContentContainer}>
          <Text style={styles.iconText}>{emoji}</Text>
          <View style={styles.courseInfoContainer}>
            <Text style={[styles.courseTitleText, { color: theme.text }]}>{course}</Text>
            <View style={styles.locationContainer}>
              <SymbolView style={styles.locationIcon} name={'mappin.circle.fill'} tintColor={courseColor} size={15} />
              <Text style={[styles.locationText, { color: theme.text }]}>{location}</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        {
          isCurrentEvent &&
          <View style={styles.progressSection}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercentage}%` }
                  ]}
                >
                </View>
              </View>
            </View>

            <View style={styles.progressLabels}>
              <Text style={[styles.progressLabel, { color: theme.text }]}>
                {formatElapsedTime(elapsed)}
              </Text>
              <Text style={[styles.progressLabel, { color: theme.text }]}>
                {remaining > 0 ? formatRemainingTime(remaining) : 'Complete'}
              </Text>
            </View>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderWidth: 2,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventTypeBackground: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Time
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeAgoText: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },

  // Main Content
  mainContentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 40,
    marginRight: 8
  },
  courseInfoContainer: {
    flex: 1,
  },
  courseTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  // Progress
  progressSection: {
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
  },

  // Location
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationIcon: {
    marginRight: 4,
    opacity: 0.7
  },
  locationText: {
    fontSize: 14,
  },
});
