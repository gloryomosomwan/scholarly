import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@/hooks';
import { useCourses } from '@/hooks/database';

import CourseCard from '@/components/SemesterPage/CourseCard';
import AddCourseButton from '@/components/SemesterPage/AddCourseButton';
import Header from '@/components/SemesterPage/Header';

export default function CoursesPage() {
  const theme = useTheme();
  const [semester, setSemester] = useState<string | null>(null)
  const courses = useCourses(semester)

  useFocusEffect(() => {
    AsyncStorage.getItem('semester').then((sem) => { setSemester(sem) })
  })

  // function removeItem() {
  //   AsyncStorage.removeItem('semester')
  // }

  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Header />
        {semester ?
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
        {/* <Button title={'remove'} onPress={() => removeItem()} /> */}
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