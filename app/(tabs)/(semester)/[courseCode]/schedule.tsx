import { StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

import { useTheme } from '@/hooks';
import { useCourseEvents } from '@/hooks/useDatabase';
import { CourseTabsParamList } from '@/types/navigation';

import CourseEventCard from '@/components/CoursePage/CourseEventCard/CourseEventCard';
import AddButton from '@/components/Buttons/AddButton';

type AssignmentsRoute = RouteProp<CourseTabsParamList, 'Assignments'>;

export default function Schedule() {
  const theme = useTheme()
  const { params: { courseID } } = useRoute<AssignmentsRoute>()
  const events = useCourseEvents(Number(courseID))
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      {events.map((event) => {
        return <CourseEventCard key={event.type} event={event} />
      })}
      <AddButton handlePress={() => router.navigate({ pathname: '/event-form', params: { coursePageID: courseID, formType: 'course' } })} title='Add Event' description='Add an event to your schedule' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
