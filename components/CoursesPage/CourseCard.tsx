import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useTheme } from '@/utils/useTheme';
import { getColorIntensity, getColorWithOpacity } from '@/app/(tabs)/courses';

interface CourseCardProps {
  code: string;
  name: string;
  instructor: string;
  credits: number;
  lectureSchedule: string;
  labSchedule?: string;
  seminarSchedule?: string;
  location: string;
  progress: number;
  nextEvent: string;
  grade: string;
  color: string;
}

export default function CourseCard({
  code,
  name,
  instructor,
  credits,
  lectureSchedule,
  labSchedule,
  seminarSchedule,
  location,
  progress,
  nextEvent,
  grade,
  color
}: CourseCardProps) {
  const theme = useTheme();

  // Generate color variations based on the course color
  const lightColor = getColorIntensity(color, 'light');
  const mediumColor = getColorIntensity(color, 'medium');
  const darkColor = getColorIntensity(color, 'dark');
  const darkerColor = getColorIntensity(color, 'darker');
  const colorWithOpacity = getColorWithOpacity(color, 0.15);

  // For dark mode, we need to adapt the header background
  const headerBackgroundColor = theme.primary === '#111827' ? theme.grey400 : lightColor;
  const borderColor = getColorWithOpacity(theme.text, 0.06);

  return (
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor: theme.secondary }]} activeOpacity={0.95}>
      {/* Header Section */}
      <View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
        <View style={styles.headerTopContainer}>
          <View style={styles.courseInfoContainer}>
            <View style={[styles.codeBadgeContainer, { backgroundColor: colorWithOpacity }]}>
              <Text style={[styles.codeBadgeText, { color: darkerColor }]}>{code}</Text>
            </View>
            <Text style={[styles.courseNameText, { color: theme.text }]} numberOfLines={2}>
              {name}
            </Text>
            <Text style={[styles.instructorText, { color: theme.grey500 }]}>{instructor}</Text>
          </View>
          <View style={styles.gradeContainer}>
            <View style={[styles.gradeCircleContainer, { backgroundColor: darkColor }]}>
              <Text style={[styles.gradeText, { color: theme.inverseText }]}>{grade}</Text>
            </View>
            <Text style={[styles.creditsText, { color: theme.grey500 }]}>{credits} credits</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabelContainer}>
            <Text style={[styles.progressLabelText, { color: theme.grey500 }]}>Course Progress</Text>
            <Text style={[styles.progressPercentText, { color: darkColor }]}>{progress}%</Text>
          </View>
          <View style={[styles.progressBarContainer, { backgroundColor: theme.grey200 }]}>
            <View
              style={[
                styles.progressBarFill,
                { backgroundColor: darkColor, width: `${progress}%` }
              ]}
            />
          </View>
        </View>
      </View>

      {/* Schedule Section */}
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleHeaderContainer}>
          <SymbolView name="calendar" size={16} tintColor={color} />
          <Text style={[styles.scheduleHeaderText, { color: theme.text }]}>Schedule</Text>
        </View>

        <View style={styles.scheduleItemsContainer}>
          <View style={styles.scheduleItemContainer}>
            <View style={[styles.scheduleTypeContainer, { backgroundColor: colorWithOpacity }]}>
              <Text style={[styles.scheduleTypeText, { color: darkColor }]}>Lecture</Text>
            </View>
            <Text style={[styles.scheduleTimeText, { color: theme.text }]}>{lectureSchedule}</Text>
          </View>

          {labSchedule && (
            <View style={styles.scheduleItemContainer}>
              <View style={[styles.scheduleTypeContainer, { backgroundColor: colorWithOpacity }]}>
                <Text style={[styles.scheduleTypeText, { color: darkColor }]}>Lab</Text>
              </View>
              <Text style={[styles.scheduleTimeText, { color: theme.text }]}>{labSchedule}</Text>
            </View>
          )}

          {seminarSchedule && (
            <View style={styles.scheduleItemContainer}>
              <View style={[styles.scheduleTypeContainer, { backgroundColor: colorWithOpacity }]}>
                <Text style={[styles.scheduleTypeText, { color: darkColor }]}>Seminar</Text>
              </View>
              <Text style={[styles.scheduleTimeText, { color: theme.text }]}>{seminarSchedule}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Footer Section */}
      <View style={[styles.footerContainer, { borderTopColor: borderColor }]}>
        <View style={styles.locationContainer}>
          <SymbolView name="location" size={14} tintColor={theme.grey500} />
          <Text style={[styles.locationText, { color: theme.grey500 }]}>{location}</Text>
        </View>

        <View style={styles.nextEventContainer}>
          <View style={[styles.nextEventBadgeContainer, { backgroundColor: mediumColor }]}>
            <SymbolView name="clock" size={12} tintColor={darkerColor} />
            <Text style={[styles.nextEventText, { color: darkerColor }]}>{nextEvent}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  courseInfoContainer: {
    flex: 1,
    marginRight: 16,
  },
  codeBadgeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  codeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  courseNameText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 8,
  },
  instructorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  gradeContainer: {
    alignItems: 'center',
  },
  gradeCircleContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '800',
  },
  creditsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  scheduleContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  scheduleHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  scheduleItemsContainer: {
    marginTop: 4,
  },
  scheduleItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleTypeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  scheduleTypeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scheduleTimeText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  nextEventContainer: {
    alignItems: 'flex-end',
  },
  nextEventBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  nextEventText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
});