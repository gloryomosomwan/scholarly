
import { View, Text, StyleSheet } from 'react-native';
import { CourseCard } from '@/components/CourseCard';
import { FontAwesome } from '@expo/vector-icons';

export default function Tab() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fall 2025</Text>
        <FontAwesome.Button name="calendar-plus-o"></FontAwesome.Button>
      </View>
      <CourseCard courseName='MARK 101' />
      <CourseCard courseName='DEV 100' />
      <CourseCard courseName='PROD 102' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8faf9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '600'
  }
});
