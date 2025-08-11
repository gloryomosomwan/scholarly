import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams } from 'expo-router';

import { useTheme } from '@/hooks';
import { useCourses } from '@/hooks/database';

import CourseCard from '@/components/SemesterPage/CourseCard';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import AddCourseButton from '@/components/SemesterPage/AddCourseButton';

export default function CoursesPage() {
  const theme = useTheme();
  const { semesterName } = useLocalSearchParams<{ semesterName: string }>()
  const courses = useCourses()
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
        </View>

        {/* Courses */}
        <View style={styles.coursesContainer}>
          {courses.map(course => <CourseCard key={course.code}{...course} />)}
        </View>

        <AddCourseButton />

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
  bottomSpacingContainer: {
    height: 20,
  },
});