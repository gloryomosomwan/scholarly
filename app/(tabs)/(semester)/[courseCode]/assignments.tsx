import { StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import AssignmentCard from '@/components/CoursePage/AssignmentCard';
import AddButton from '@/components/Buttons/AddButton';

import { useTheme } from '@/hooks/useTheme';
import { useAssignmentsByCourse } from '@/hooks/useDatabase';
import { CourseTabsParamList } from '@/types/navigation';

type AssignmentsRoute = RouteProp<CourseTabsParamList, 'Assignments'>;

export default function Assignments() {
  const theme = useTheme()
  const { params: { courseID } } = useRoute<AssignmentsRoute>()
  const assignments = useAssignmentsByCourse(parseInt(courseID))
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {assignments.map((assignment) => <AssignmentCard assignment={assignment} />)}
      <AddButton title='Add Assignment' route='/assignment-form' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
