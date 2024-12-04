import { StyleSheet, Text, View } from 'react-native';
import { ExamItem } from '@/components/ExamItem';

const midterm = {
  title: 'Miderm',
  day: 'Tuesday, October 3',
  time: '2:00PM - 4:00PM',
  location: 'ESO 2A'
}

const final = {
  title: 'Final Exam',
  day: 'Wednesday, December 9',
  time: '2:00PM - 4:00PM',
  location: 'ESO 2A'
}

export default function Exams() {
  return (
    <View style={styles.container}>
      <ExamItem {...midterm} />
      <ExamItem {...final} />
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
