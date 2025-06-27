import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { Link } from 'expo-router'

import { useTheme } from '@/utils/useTheme';
import { getColorWithOpacity, getCoursePalette } from '@/utils/utility';
import { Course } from '@/types';

export default function CourseCard({ code, name, instructor, credits, grade, color }: Course) {
  const theme = useTheme();
  const scheme = useColorScheme()
  const { light, medium, dark, darker } = getCoursePalette(color)
  const colorWithOpacity = getColorWithOpacity(color, 0.15);
  const borderColor = getColorWithOpacity(theme.text, 0.06);

  return (
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor: theme.secondary }]} activeOpacity={0.95}>
      {/* Header Section */}
      <View style={[styles.headerContainer, { backgroundColor: scheme === 'light' ? medium : darker }]}>
        <View style={styles.headerTopContainer}>
          <View style={styles.courseInfoContainer}>
            <View style={[styles.courseCodeContainer, { backgroundColor: colorWithOpacity }]}>
              <Text style={[styles.courseCodeText, { color: scheme === 'light' ? dark : light }]}>{code}</Text>
            </View>
            <Text style={[styles.courseNameText, { color: theme.text }]} numberOfLines={2}>
              {name}
            </Text>
            <Text style={[styles.instructorText, { color: theme.grey600 }]}>{instructor}</Text>
          </View>
          <View style={styles.gradeContainer}>
            <View style={[styles.gradeCircleContainer, { backgroundColor: dark }]}>
              <Text style={[styles.gradeText, { color: theme.textOnDarkBackground }]}>{grade}</Text>
            </View>
            <Text style={[styles.creditsText, { color: scheme === 'light' ? darker : light }]}>{credits} credits</Text>
          </View>
        </View>
      </View>

      {/* Schedule Section */}
      <View style={styles.scheduleContainer}>
        <View>
          <View style={[styles.scheduleCardContainer, { backgroundColor: getColorWithOpacity(color, 0.15), borderColor: scheme === 'light' ? light : dark }]}>
            <View style={styles.scheduleCardTextContainer}>
              <Text style={[styles.scheduleCardHeaderText, { color: dark }]}>UP NEXT</Text>
              <Text style={[styles.scheduleCardText, { color: darker }]}>Lecture 10:00 AM</Text>
            </View>
            <SymbolView name={'bell'} tintColor={color} size={24} />
          </View>
          <View style={[styles.scheduleCardContainer, { backgroundColor: getColorWithOpacity(color, 0.15), borderColor: scheme === 'light' ? light : dark }]}>
            <View style={styles.scheduleCardTextContainer}>
              <Text style={[styles.scheduleCardHeaderText, { color: dark }]}>DUE NEXT</Text>
              <Text style={[styles.scheduleCardText, { color: darker }]}>Problem Set 5</Text>
            </View>
            <View style={[styles.scheduleCardDot, { backgroundColor: color }]} />
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={[styles.footerContainer, { borderTopColor: borderColor }]}>
        <View style={[styles.scheduleCardContainer, { backgroundColor: theme.secondary, borderColor: scheme === 'light' ? light : dark, justifyContent: 'center' }]}>
          <Link href={{ pathname: '/[courseCode]/schedule', params: { courseCode: code, courseName: name, instructor: instructor, credits: credits, grade: grade, color: color } }} >
            <Text style={[styles.scheduleCardHeaderText, { color: dark }]}>View Details</Text>
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
  courseCodeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  courseCodeText: {
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