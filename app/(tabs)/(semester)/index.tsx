import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks';
import { useCourses } from '@/hooks/useDatabase';
import { useUserStore } from '@/stores';

import CourseCard from '@/components/SemesterPage/CourseCard';
import AddCourseButton from '@/components/SemesterPage/AddCourseButton';
import Header from '@/components/SemesterPage/Header';

export default function SemesterPage() {
  const theme = useTheme();
  const insets = useSafeAreaInsets()
  const semesterID = useUserStore((state) => state.semesterID)
  const courses = useCourses()
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Header />
        {semesterID ?
          <View>
            <View style={styles.coursesContainer}>
              {courses.map(course => <CourseCard key={course.code}{...course} />)}
            </View>
            <AddCourseButton />
          </View>
          :
          <View>
            <Button title={'Add semester'} onPress={() => router.push('/semester-form')} />
          </View>
        }
        {/* <View style={styles.bottomSpacingContainer} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {},
  coursesContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  // bottomSpacingContainer: {
  //   height: 20,
  // },
});