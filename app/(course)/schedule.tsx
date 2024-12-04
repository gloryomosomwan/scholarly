import { StyleSheet, Text, View } from 'react-native';
import { CourseEvent } from '@/components/CourseEvent';

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
  return (
    <View style={styles.container} >
      <CourseEvent {...lecture} />
      <CourseEvent {...lab} />
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
