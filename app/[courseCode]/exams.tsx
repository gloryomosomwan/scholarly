import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/utils/useTheme';
import { exams } from '@/utils/Calendar/data';
import ExamCard from '@/components/CoursePage/ExamCard';

export default function Exams() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {exams.map(exam => <ExamCard exam={exam} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
