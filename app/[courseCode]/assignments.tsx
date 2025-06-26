import { StyleSheet, ScrollView } from 'react-native';
import { AssignmentItem } from '@/components/AssignmentItem';

import { useTheme } from '@/utils/useTheme';

const assignment1 = {
  title: 'Assignment 1',
  dueDate: 'Tuesday, October 3',
  dueTime: '7:00PM'
}

const assignment2 = {
  title: 'Assignment 2',
  dueDate: 'Monday, November 10',
  dueTime: '7:00PM'
}

const assignment3 = {
  title: 'Assignment 3',
  dueDate: 'Friday, December 4',
  dueTime: '7:00PM'
}

export default function Assignments() {
  const theme = useTheme()
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* <AssignmentItem {...assignment1} />
      <AssignmentItem {...assignment2} />
      <AssignmentItem {...assignment3} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
