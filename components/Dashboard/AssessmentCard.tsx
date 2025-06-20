import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols'

import dayjs from '@/utils/dayjs'
import { courseColors } from '@/utils/Calendar/data';
import { useTheme } from '@/utils/useTheme';
import tinycolor from 'tinycolor2';

type AssessmentCardProps = {
  assessment: {
    type: string;
    course: string;
    emoji: string;
    location: string;
    start: Date;
    end: Date;
  };
};

export default function AssessmentCard({ assessment }: AssessmentCardProps) {
  const courseColor = courseColors[assessment.course as keyof typeof courseColors]
  const theme = useTheme()

  const now = dayjs()
  const isCurrentEvent = now.isBetween(assessment.start, assessment.end)
  const isUpNext = now.isBefore(assessment.start)
  let timeLeftString
  let timeFromNowString
  if (isCurrentEvent) {
    const timeLeft = dayjs(assessment.end).fromNow(true)
    timeLeftString = timeLeft + ' left'
  }
  if (isUpNext) {
    timeFromNowString = dayjs(assessment.start).fromNow()
    timeFromNowString = timeFromNowString.charAt(0).toUpperCase() + timeFromNowString.slice(1)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]} >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.leftContent}>
              <View style={[styles.courseContainer, { backgroundColor: tinycolor(courseColor).setAlpha(0.15).toRgbString() }]}>
                <Text style={[styles.courseName, { color: courseColor }]}>{assessment.course}</Text>
              </View>
              <Text style={[styles.assessmentType, { color: theme.text }]}>{assessment.type}</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={[styles.timeRange, { color: theme.grey600 }]}>
                {`${assessment.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} - ${assessment.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}`}
              </Text>
              <Text style={[styles.timeAgo, { color: theme.grey400 }]}>
                {isCurrentEvent ? timeLeftString : timeFromNowString}
              </Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <SymbolView name={'mappin.circle.fill'} tintColor={courseColor} style={[styles.locationIcon]} size={15} />
            <Text style={[styles.locationText, { color: theme.grey500 }]}>{assessment.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    borderWidth: 2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    // flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftContent: {
    // flex: 1,
    alignItems: 'flex-start'
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  assessmentType: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },
  courseEmoji: {
    marginRight: 3,
    fontSize: 12
  },
  courseName: {
    fontSize: 12,
    fontWeight: '700',
  },
  timeRange: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeAgo: {
    fontSize: 14,
    opacity: 0.7,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    opacity: 0.8
  },
  locationText: {
    fontSize: 14,
    opacity: 0.9,
    fontWeight: '500'
  },
  locationIcon: {
    opacity: 0.8,
    marginRight: 5,
  },
});