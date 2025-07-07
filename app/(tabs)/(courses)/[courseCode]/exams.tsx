import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/hooks';
import { exams } from '@/data/data';
import ExamCard from '@/components/CoursePage/ExamCard';
import AddButton from '@/components/Buttons/AddButton';

export default function Exams() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {exams.map(exam => <ExamCard key={exam.id} {...exam} />)}
      <AddButton route='/exam-form' title='Add Exam' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
