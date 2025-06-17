import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols';

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
  const { type, course, emoji, location, start, end } = event;
  const courseGradient = courseGradients[event.course as keyof typeof courseGradients];

  // Calculate progress and time remaining
  const now = new Date();
  const totalDuration = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const remaining = end.getTime() - now.getTime();

  const now2 = dayjs()
  const isCurrentEvent = now2.isBetween(event.start, event.end)
  const isUpNext = now2.isBefore(event.start)
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

  // Calculate progress percentage
  const progressPercentage = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format remaining time
  const formatRemainingTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m left`;
    }
    return `${remainingMinutes} minutes left`;
  };

  // Format elapsed time
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

      <LinearGradient
        colors={['#EC4899', '#E11D48']}
        // colors={[courseGradient[0], courseGradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatTime(start)} - {formatTime(end)}
            </Text>
            <Text style={styles.timeAgo}>
              {!isCurrentEvent && timeFromNowString}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.iconText}>{emoji}</Text>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course}</Text>
            <View style={styles.locationContainer}>
              <SymbolView style={styles.locationIcon} name={'mappin.circle.fill'} tintColor={'white'} size={15} />
              <Text style={styles.locationText}>{location}</Text>
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

            <View style={styles.timeLabels}>
              <Text style={styles.timeLabel}>
                {formatElapsedTime(elapsed)}
              </Text>
              <Text style={styles.timeLabel}>
                {remaining > 0 ? formatRemainingTime(remaining) : 'Complete'}
              </Text>
            </View>
          </View>
        }
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    // paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  typeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  remainingText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 40,
    marginRight: 8
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
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
    backgroundColor: 'white',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  progressIndicator: {
    width: 4,
    height: 4,
    backgroundColor: 'rgba(236, 72, 153, 0.7)',
    borderRadius: 2,
    marginRight: 4,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationIcon: {
    marginRight: 4,
    opacity: 0.7
  },
  timeAgo: {
    fontSize: 13,
    color: 'white',
    opacity: 0.7,
    marginTop: 2,
  },
});
