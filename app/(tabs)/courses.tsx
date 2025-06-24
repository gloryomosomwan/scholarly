import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useTheme } from '@/utils/useTheme';
import CourseCard from '@/components/CoursesPage/CourseCard';
import { getColorWithOpacity } from '@/utils/utility';

interface CourseProps {
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

export default function CoursesPage() {
  const theme = useTheme();

  const courseData: CourseProps = {
    code: "MARK 101",
    name: "Principles of Marketing",
    instructor: "Dr. Sarah Chen",
    credits: 3,
    lectureSchedule: "MWF 10:00-11:00 AM",
    labSchedule: "T 2:00-4:00 PM",
    seminarSchedule: "Th 11:00-12:00 PM",
    location: "Business 204",
    progress: 78,
    nextEvent: "Today 10:00 AM",
    grade: "A-",
    color: theme.success
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
          {/* Top Row */}
          <View style={styles.headerTopContainer}>
            <View style={styles.semesterInfoContainer}>
              <Text style={[styles.semesterText, { color: theme.text }]}>Summer 2025</Text>
            </View>
            <SymbolView name="calendar" size={35} tintColor={theme.text} />
          </View>

          {/* Stats Row */}
          <View style={[styles.statsContainer, {
            backgroundColor: theme.primary
          }]}>
            <View style={styles.statItemContainer}>
              <View style={styles.statTextContainer}>
                <Text style={[styles.statLabelText, { color: theme.grey400 }]}>GPA</Text>
                <Text style={[styles.statValueText, { color: theme.text }]}>3.7</Text>
              </View>
            </View>

            <View style={styles.statItemContainer}>
              <View style={styles.statTextContainer}>
                <Text style={[styles.statLabelText, { color: theme.grey400 }]}>CREDITS</Text>
                <Text style={[styles.statValueText, { color: theme.text }]}>10</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Course */}
        <View style={styles.courseContainer}>
          <CourseCard {...courseData} />
          <CourseCard {...courseData} />
          <CourseCard {...courseData} />
        </View>

        {/* Add Course Button */}
        <View style={styles.addCourseContainer}>
          <TouchableOpacity style={[styles.addCourseButtonContainer, {
            backgroundColor: theme.secondary,
            borderColor: theme.grey400
          }]}>
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
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 8,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
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
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  statItemContainer: {
  },
  statIconContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  statTextContainer: {
    alignItems: 'center'
  },
  statLabelText: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValueText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    height: 32,
    marginHorizontal: 16,
  },
  courseContainer: {
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