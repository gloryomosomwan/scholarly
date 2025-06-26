import { StyleSheet, ScrollView } from 'react-native';
import { ExamItem } from '@/components/ExamItem';

import { useTheme } from '@/utils/useTheme';

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
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* <ExamItem {...midterm} />
      <ExamItem {...final} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
});
