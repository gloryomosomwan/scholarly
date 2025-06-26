import { StyleSheet, ScrollView } from 'react-native';
import { CourseEvent } from '@/components/CourseEvent';

import { useTheme } from '@/utils/useTheme';

const lecture = {
  eventType: 'Lecture',
  time: '10:00AM - 11:00AM',
  frequency: 'Every Week S M T W T F S',
  location: 'BRJ 5-69'
}

const lab = {
  eventType: 'Lab',
  time: '4:00PM - 5:00PM',
  frequency: 'Every Week S M T W T F S',
  location: 'BRJ 2-80'
}

export default function Schedule() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      {/* <CourseEvent {...lecture} />
      <CourseEvent {...lab} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
