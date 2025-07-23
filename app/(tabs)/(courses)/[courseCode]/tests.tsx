import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/hooks';
import { tests } from '@/data/data';
import TestCard from '@/components/CoursePage/TestCard';
import AddButton from '@/components/Buttons/AddButton';

export default function Exams() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      {tests.map(test => <TestCard key={test.id} {...test} />)}
      <AddButton route='/test-form' title='Add Exam' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
