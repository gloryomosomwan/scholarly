import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useTheme } from '@/utils/useTheme';
import CourseCard from '@/components/CoursesPage/CourseCard';

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
  color: string; // Added course color
}

// Color utility functions for different intensities
export const getColorIntensity = (baseColor: string, intensity: 'light' | 'medium' | 'dark' | 'darker'): string => {
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

export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const { width } = Dimensions.get('window');

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
    color: "#B91081" // Course theme color
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.primary }]}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={[styles.headerGradientContainer, { backgroundColor: theme.secondary }]}>
            <View style={styles.headerContentContainer}>
              {/* Top Row */}
              <View style={styles.headerTopContainer}>
                <View style={styles.semesterInfoContainer}>
                  <View style={[styles.semesterBadgeContainer, { backgroundColor: getColorWithOpacity('#F59E0B', 0.15) }]}>
                    <SymbolView name="sparkles" size={14} tintColor="#F59E0B" />
                    <Text style={[styles.semesterBadgeText, { color: '#F59E0B' }]}>Current</Text>
                  </View>
                  <Text style={[styles.semesterText, { color: theme.inverseText }]}>Fall 2025</Text>
                  <Text style={[styles.headerSubtitleText, { color: theme.grey500 }]}>Academic excellence in progress</Text>
                </View>
                <View style={[styles.headerIconContainer, { backgroundColor: getColorWithOpacity(theme.inverseText, 0.1) }]}>
                  <SymbolView name="graduationcap" size={24} tintColor={theme.inverseText} />
                </View>
              </View>

              {/* Stats Row */}
              <View style={[styles.statsContainer, {
                backgroundColor: getColorWithOpacity(theme.inverseText, 0.1),
                borderColor: getColorWithOpacity(theme.inverseText, 0.15)
              }]}>
                <View style={styles.statItemContainer}>
                  <View style={[styles.statIconContainer, { backgroundColor: getColorWithOpacity(theme.inverseText, 0.15) }]}>
                    <SymbolView name="target" size={16} tintColor={theme.success} />
                  </View>
                  <View style={styles.statTextContainer}>
                    <Text style={[styles.statLabelText, { color: theme.grey500 }]}>GPA</Text>
                    <Text style={[styles.statValueText, { color: theme.inverseText }]}>3.7</Text>
                  </View>
                </View>

                <View style={[styles.statDivider, { backgroundColor: getColorWithOpacity(theme.inverseText, 0.2) }]} />

                <View style={styles.statItemContainer}>
                  <View style={[styles.statIconContainer, { backgroundColor: getColorWithOpacity(theme.inverseText, 0.15) }]}>
                    <SymbolView name="book" size={16} tintColor={theme.accent} />
                  </View>
                  <View style={styles.statTextContainer}>
                    <Text style={[styles.statLabelText, { color: theme.grey500 }]}>CREDITS</Text>
                    <Text style={[styles.statValueText, { color: theme.inverseText }]}>10/12</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Course */}
        <View style={styles.courseContainer}>
          <CourseCard {...courseData} />
        </View>

        {/* Add Course Button */}
        <View style={styles.addCourseContainer}>
          <TouchableOpacity style={[styles.addCourseButtonContainer, {
            backgroundColor: theme.secondary,
            borderColor: theme.tertiary
          }]}>
            <View style={styles.addCourseContentContainer}>
              <View style={[styles.addCourseIconContainer, { backgroundColor: theme.lightBlue }]}>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerGradientContainer: {
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  headerContentContainer: {
    flex: 1,
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
  headerIconContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    marginLeft: 16,
  },
  statsContainer: {
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  statItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    flex: 1,
  },
  statLabelText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValueText: {
    fontSize: 20,
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