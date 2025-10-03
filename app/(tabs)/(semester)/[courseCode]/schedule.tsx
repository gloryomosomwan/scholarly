import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/hooks';
import ScheduleCard from '@/components/CoursePage/ScheduleCard';
import type { ScheduleCardProps } from '@/components/CoursePage/ScheduleCard';
import AddButton from '@/components/Buttons/AddButton';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CourseTabsParamList } from '@/types/navigation';
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

type AssignmentsRoute = RouteProp<CourseTabsParamList, 'Assignments'>;

export default function Schedule() {
  const theme = useTheme()
  const { params: { courseID } } = useRoute<AssignmentsRoute>()
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      <ScheduleCard schedule={lecture} />
      <AddButton handlePress={() => router.navigate({ pathname: '/event-form', params: { coursePageID: courseID } })} title='Add Event' description='Add an event to your schedule' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
