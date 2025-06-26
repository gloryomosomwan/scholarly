import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { Link } from 'expo-router'

import { useTheme } from '@/utils/useTheme';
import { getColorWithOpacity } from '@/utils/utility';

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

export default function CourseCard({ code, name, instructor, credits, progress, grade, color }: CourseCardProps) {
  const theme = useTheme();

  const lightColor = getColorIntensity(color, 'light');
  const mediumColor = getColorIntensity(color, 'medium');
  const darkColor = getColorIntensity(color, 'dark');
  const darkerColor = getColorIntensity(color, 'darker');
  const colorWithOpacity = getColorWithOpacity(color, 0.15);

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
        <View>
          <View style={[styles.scheduleCardContainer, { backgroundColor: getColorWithOpacity(color, 0.15), borderColor: lightColor }]}>
            <View style={styles.scheduleCardTextContainer}>
              <Text style={[styles.scheduleCardHeaderText, { color: darkColor }]}>UP NEXT</Text>
              <Text style={[styles.scheduleCardText, { color: darkerColor }]}>Lecture 10:00 AM</Text>
            </View>
            <SymbolView name={'bell'} tintColor={color} size={24} />
          </View>
          <View style={[styles.scheduleCardContainer, { backgroundColor: getColorWithOpacity(color, 0.15), borderColor: lightColor }]}>
            <View style={styles.scheduleCardTextContainer}>
              <Text style={[styles.scheduleCardHeaderText, { color: darkColor }]}>DUE NEXT</Text>
              <Text style={[styles.scheduleCardText, { color: darkerColor }]}>Problem Set 5</Text>
            </View>
            <View style={[styles.scheduleCardDot, { backgroundColor: color }]} />
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={[styles.footerContainer, { borderTopColor: borderColor }]}>
        <View style={[styles.scheduleCardContainer, { backgroundColor: theme.secondary, borderColor: lightColor, justifyContent: 'center' }]}>
          <Link href={{ pathname: '/[courseCode]/schedule', params: { courseCode: 'MATH 124', courseName: 'Calculus I', grade: 'A+', credits: '3' } }} >
            <Text style={[styles.scheduleCardHeaderText, { color: darkColor }]}>View Details</Text>
          </Link>
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
    paddingHorizontal: 15,
  },
  footerContainer: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  scheduleCardContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 7,
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scheduleCardTextContainer: {

  },
  scheduleCardHeaderText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  scheduleCardText: {
    fontWeight: '600',
    fontSize: 16
  },
  scheduleCardDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    right: 10
  }
});

const getColorIntensity = (baseColor: string, intensity: 'light' | 'medium' | 'dark' | 'darker'): string => {
  const colorMap: { [key: string]: { [key in typeof intensity]: string } } = {
    '#007FFF': {
      light: '#EFF6FF',
      medium: '#BFDBFE',
      dark: '#1D4ED8',
      darker: '#1E3A8A'
    },
    '#10B981': {
      light: '#D1FAE5',
      medium: '#86EFAC',
      dark: '#059669',
      darker: '#047857'
    },
    '#F59E0B': {
      light: '#FEF3C7',
      medium: '#FCD34D',
      dark: '#D97706',
      darker: '#B45309'
    },
    '#EF4444': {
      light: '#FECACA',
      medium: '#FCA5A5',
      dark: '#DC2626',
      darker: '#B91C1C'
    },
    '#8B5CF6': {
      light: '#EDE9FE',
      medium: '#C4B5FD',
      dark: '#7C3AED',
      darker: '#6D28D9'
    },
    '#06B6D4': {
      light: '#CFFAFE',
      medium: '#67E8F9',
      dark: '#0891B2',
      darker: '#0E7490'
    }
  };

  return colorMap[baseColor]?.[intensity] || baseColor;
};