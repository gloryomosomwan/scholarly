import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols'

import dayjs from '@/utils/dayjs'
import { courseGradients } from '@/utils/Calendar/data';

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
  const courseGradient = courseGradients[assessment.course as keyof typeof courseGradients];
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
      <LinearGradient
        colors={[courseGradient[0], courseGradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.leftContent}>
              <View style={styles.courseContainer}>
                <Text style={styles.courseEmoji}>{assessment.emoji}</Text>
                <Text style={styles.courseName}>{assessment.course}</Text>
              </View>
              <Text style={[styles.assessmentType, { color: 'white' }]}>{assessment.type}</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={[styles.timeRange]}>{`${assessment.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} - ${assessment.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}`}</Text>
              <Text style={styles.timeAgo}>
                {isCurrentEvent ? timeLeftString : timeFromNowString}
              </Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <SymbolView name={'mappin.circle.fill'} tintColor={'white'} style={styles.locationIcon} size={15} />
            <Text style={styles.locationText}>{assessment.location}</Text>
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
  assessmentType: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  courseEmoji: {
    marginRight: 3,
    fontSize: 14
  },
  courseName: {
    fontSize: 14,
    fontWeight: '700',
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
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    opacity: 0.8
  },
  locationText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    fontWeight: '500'
  },
  locationIcon: {
    opacity: 0.8,
    color: 'white',
    marginRight: 5,
  },
});