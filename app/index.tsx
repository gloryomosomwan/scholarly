import { Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import Animated from "react-native-reanimated";

import { Card } from '@/components/Card'
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";

export default function Index() {
  const lecture = {
    type: 'event',
    topLeft: 'Lecture',
    main: 'PROD 102',
    bottomLeft: 'BSJ 3-20',
    topRight: '9:00 AM - 10:00 AM',
    bottomRight: '30 minutes left'
  }

  const exam = {
    type: 'event',
    topLeft: 'MARK 101',
    main: 'Final Exam',
    bottomLeft: 'ABC 1-234',
    topRight: '12:00 PM - 3:00PM',
  }

  const task = {
    type: 'task',
    topLeft: "DEV 101",
    main: "Review Reading 2",
    topRight: "Due Today",
    bottomRight: "Priority: Low"
  }

  return (
    // <SafeAreaView>
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.greeting}>Good morning, Glory.</Text>
      <Text style={styles.date}>Friday, November 28</Text>
      <Text style={styles.header}>Currently:</Text>
      <Card
        type={lecture.type}
        topLeft={lecture.topLeft}
        main={lecture.main}
        bottomLeft={lecture.bottomLeft}
        topRight={lecture.topRight}
        bottomRight={lecture.bottomRight}
      />
      <Text style={styles.header}>Up Next:</Text>
      <Card
        type={lecture.type}
        topLeft={lecture.topLeft}
        main={lecture.main}
        bottomLeft={lecture.bottomLeft}
        topRight={lecture.topRight}
        bottomRight={lecture.bottomRight}
      />
      <Text style={styles.header}>Today's Tasks:</Text>
      <Card
        type={task.type}
        topLeft={task.topLeft}
        main={task.main}
        topRight={task.topRight}
        bottomRight={task.bottomRight}
      />
      <Card
        type={task.type}
        topLeft={task.topLeft}
        main={task.main}
        topRight={task.topRight}
        bottomRight={task.bottomRight}
      />
      <Card
        type={task.type}
        topLeft={task.topLeft}
        main={task.main}
        topRight={task.topRight}
        bottomRight={task.bottomRight}
      />
      <Text style={styles.header}>Upcoming Dates:</Text>
      <Card
        type={exam.type}
        topLeft={exam.topLeft}
        main={exam.main}
        bottomLeft={exam.bottomLeft}
        topRight={exam.topRight}
      />
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8faf9'
  },
  greeting: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: '600'
  },
  date: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
    color: '#9496A1'
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600'
  }
});
