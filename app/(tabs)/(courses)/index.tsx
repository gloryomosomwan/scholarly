import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams } from 'expo-router';

import { useTheme } from '@/hooks';
import { getColorWithOpacity } from '@/utils/utility';
import { courses } from '@/data/data';

import CourseCard from '@/components/CoursesPage/CourseCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

export default function CoursesPage() {
  const theme = useTheme();
  const { semesterName } = useLocalSearchParams<{ semesterName: string }>()
  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
          {/* Top Row */}
          <View style={styles.headerTopContainer}>
            <View style={styles.semesterInfoContainer}>
              <Text style={[styles.semesterText, { color: theme.text }]}>{semesterName}</Text>
            </View>
            <PressableOpacity onPress={() => router.navigate('/select-semester')}>
              <SymbolView name="calendar" size={35} tintColor={theme.text} />
            </PressableOpacity>
          </View>

          {/* Stats Row */}
          {/* <View style={[styles.statRowContainer, { backgroundColor: theme.primary }]}>
            <View style={[styles.statContainer, { backgroundColor: theme.grey100 }]}>
              <Text style={[styles.statLabelText, { color: theme.grey600 }]}>GPA: </Text>
              <Text style={[styles.statValueText, { color: theme.text }]}>3.7</Text>
            </View>
            <View style={[styles.statContainer, { backgroundColor: theme.grey100 }]}>
              <Text style={[styles.statLabelText, { color: theme.grey600 }]}>Credits: </Text>
              <Text style={[styles.statValueText, { color: theme.text }]}>10</Text>
            </View>
          </View> */}
        </View>

        {/* Course */}
        <View style={styles.coursesContainer}>
          {courses.map(course => <CourseCard key={course.code}{...course} />)}
        </View>

        {/* Add Course Button */}
        <View style={styles.addCourseContainer}>
          <TouchableOpacity style={[styles.addCourseButtonContainer, { backgroundColor: theme.secondary, borderColor: theme.grey400 }]} onPress={() => { router.navigate('/course-form') }}>
            <View style={styles.addCourseContentContainer}>
              <View style={[styles.addCourseIconContainer, { backgroundColor: getColorWithOpacity(theme.accent, 0.05) }]}>
                <SymbolView name="plus" size={20} tintColor={theme.accent} />
              </View>
              <View style={styles.addCourseTextContainer}>
                <Text style={[styles.addCourseText, { color: theme.text }]}>Add Course</Text>
                <Text style={[styles.addCourseSubtitleText, { color: theme.grey500 }]}>Enroll in a new course</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacingContainer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    // flex: 1,
  },
  scrollContainer: {
    // flex: 1,
  },
  headerContainer: {
    paddingTop: 24,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  headerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  semesterInfoContainer: {
    flex: 1,
  },
  semesterBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  semesterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  semesterText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitleText: {
    fontSize: 14,
    fontWeight: '400',
  },
  statRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statIconContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statLabelText: {
    fontSize: 11,
    fontWeight: '400',
  },
  statValueText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    height: 32,
    marginHorizontal: 16,
  },
  coursesContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  addCourseContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addCourseButtonContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  addCourseContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCourseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addCourseTextContainer: {
    flex: 1,
  },
  addCourseText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  addCourseSubtitleText: {
    fontSize: 14,
  },
  bottomSpacingContainer: {
    height: 20,
  },
});