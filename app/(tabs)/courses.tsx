import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

import { CourseCard } from '@/components/CourseCard';

export default function Tab() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Fall 2025</Text>
          <FontAwesome.Button name="calendar-plus-o"></FontAwesome.Button>
        </View>
        <CourseCard courseName='MARK 101' page='../(course)/schedule' />
        <CourseCard courseName='DEV 100' page='../(course)/schedule' />
        <CourseCard courseName='PROD 102' page='../(course)/schedule' />
      </View>
    </SafeAreaView>
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
