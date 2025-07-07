import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';

import { useTheme } from '@/hooks';
import ScheduleCard from '@/components/CoursePage/ScheduleCard';
import type { ScheduleCardProps } from '@/components/CoursePage/ScheduleCard';
import { SymbolView } from 'expo-symbols';
import { getColorWithOpacity } from '@/utils/utility';
import { router } from 'expo-router';

const lecture: ScheduleCardProps['schedule'] = {
  id: 1,
  type: 'Lecture',
  time: '10:00AM - 11:00AM',
  days: 'Every Week S M T W T F S',
  location: 'BRJ 2-30',
  status: 'upcoming',
  topic: 'Idek'
}

export default function Schedule() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      <ScheduleCard schedule={lecture} />
      <View style={styles.addCourseContainer}>
        <TouchableOpacity style={[styles.addCourseButtonContainer, { backgroundColor: theme.secondary, borderColor: theme.grey400 }]} onPress={() => { router.navigate('/course-form') }}>
          <View style={styles.addCourseContentContainer}>
            <View style={[styles.addCourseIconContainer, { backgroundColor: getColorWithOpacity(theme.accent, 0.05) }]}>
              <SymbolView name="plus" size={20} tintColor={theme.accent} />
            </View>
            <View style={styles.addCourseTextContainer}>
              <Text style={[styles.addCourseText, { color: theme.text }]}>Add Event</Text>
              <Text style={[styles.addCourseSubtitleText, { color: theme.grey500 }]}>Add an event to your schedule</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addCourseContainer: {
    paddingTop: 12,
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
});
