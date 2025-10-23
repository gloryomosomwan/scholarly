import { StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { RouteProp, useRoute } from '@react-navigation/native';

import { useTheme } from '@/hooks';
import { useTestsByCourse } from '@/hooks/useDatabase';
import { CourseTabsParamList } from '@/types/navigation';

import TestCard from '@/components/CoursePage/TestCard/TestCard';
import AddButton from '@/components/Buttons/AddButton';

type AssignmentsRoute = RouteProp<CourseTabsParamList, 'Assignments'>;

export default function Exams() {
  const theme = useTheme()
  const { params: { courseID } } = useRoute<AssignmentsRoute>()
  const tests = useTestsByCourse(parseInt(courseID))
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {tests.map(test => <TestCard key={test.id} {...test} />)}
      <AddButton title='Add Exam' handlePress={() => router.navigate({ pathname: '/test-form', params: { courseID: courseID } })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
