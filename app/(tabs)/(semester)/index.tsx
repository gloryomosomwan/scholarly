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
  semesterText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
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