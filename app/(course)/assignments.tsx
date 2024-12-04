import { StyleSheet, Text, View } from 'react-native';
import { AssignmentItem } from '@/components/AssignmentItem';

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
  return (
    <View style={styles.container}>
      <AssignmentItem {...assignment1} />
      <AssignmentItem {...assignment2} />
      <AssignmentItem {...assignment3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
});
