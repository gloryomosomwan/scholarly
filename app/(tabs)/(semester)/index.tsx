import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import { useTheme } from '@/hooks';
import { useCourses } from '@/hooks/database';

import CourseCard from '@/components/SemesterPage/CourseCard';
import AddCourseButton from '@/components/SemesterPage/AddCourseButton';
import Header from '@/components/SemesterPage/Header';

export default function CoursesPage() {
  const theme = useTheme();
  const courses = useCourses()
  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.coursesContainer}>
          {courses.map(course => <CourseCard key={course.code}{...course} />)}
        </View>
        <AddCourseButton />
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
  coursesContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  bottomSpacingContainer: {
    height: 20,
  },
});