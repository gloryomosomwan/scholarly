import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/utils/useTheme';
import ExamCard from '@/components/CoursePage/ExamCard';

const midterm = {
  id: 1,
  title: 'Midterm',
  start: new Date(2025, 5, 28, 10),
  end: new Date(2025, 5, 28, 11),
  weight: '30%',
  location: 'BSD 30-1',
  notes: 'Crush it!'
}

export default function Exams() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      <ExamCard exam={midterm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
