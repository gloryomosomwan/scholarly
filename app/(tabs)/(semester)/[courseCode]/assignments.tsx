import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/hooks';
import AssignmentCard from '@/components/CoursePage/AssignmentCard';
import AddButton from '@/components/Buttons/AddButton';

const assignment1 = {
  id: 1,
  title: 'Problem Set 4',
  description: 'Check with John',
  due: new Date(2025, 5, 30),
  courseWeight: '15%'
}

export default function Assignments() {
  const theme = useTheme()
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      <AssignmentCard assignment={assignment1} />
      <AddButton title='Add Assignment' route='/task-form' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
