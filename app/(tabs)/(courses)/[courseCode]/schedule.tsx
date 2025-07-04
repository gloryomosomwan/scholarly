import { StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import ScheduleCard from '@/components/CoursePage/ScheduleCard';
import type { ScheduleCardProps } from '@/components/CoursePage/ScheduleCard';

const lecture: ScheduleCardProps['schedule'] = {
  id: 1,
  type: 'Lecture',
  time: '10:00AM - 11:00AM',
  days: 'Every Week S M T W T F S',
  location: 'BRJ 2-30',
  status: 'upcoming',
  topic: 'Idek'
}

export default function Schedule() {
  const theme = useTheme()

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      <ScheduleCard schedule={lecture} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
