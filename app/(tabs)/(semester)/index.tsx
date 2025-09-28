import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks';
import { useCourses, useSemesters } from '@/hooks/useDatabase';
import { useUserStore } from '@/stores';

import CourseCard from '@/components/SemesterPage/CourseCard';
import Header from '@/components/SemesterPage/Header';
import AddButton from '@/components/Buttons/AddButton';

export default function SemesterPage() {
  const theme = useTheme();
  const insets = useSafeAreaInsets()
  const semesters = useSemesters()
  const numOfSemesters = semesters.length
  const semesterID = useUserStore((state) => state.semesterID)
  const courses = useCourses()
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {semesters.length === 0 ?
          <AddButton handlePress={() => router.push('/semester-form')} title='Add Semester' description='Add a semester to your schedule' />
          :
          semesterID === undefined ?
            <AddButton handlePress={() => router.navigate('/select-semester')} title='Choose Semester' description='Choose a semester to your schedule' />
            :
            <View>
              <View style={styles.coursesContainer}>
                <Header numOfSemesters={numOfSemesters} />
                {courses.map(course => <CourseCard key={course.code}{...course} />)}
              </View>
              <AddButton title='Add Course' description='Enroll in a new course' handlePress={() => router.navigate('/course-form')} />
            </View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  scrollContainer: {},
  coursesContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});