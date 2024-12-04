import { Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, View } from "react-native";

import { Card } from '@/components/Card'

export default function Index() {
  const currentLecture = {
    type: 'event',
    topLeft: 'Lecture',
    main: 'PROD 102',
    bottomLeft: 'BSJ 3-20',
    topRight: '9:00 AM - 10:00 AM',
    bottomRight: '30 minutes left'
  }

  const nextLecture = {
    type: 'event',
    topLeft: 'Lecture',
    main: 'MARK 101',
    bottomLeft: 'XYZ 2-90',
    topRight: '10:00 AM - 11:00 AM',
    bottomRight: 'In 24 minutes'
  }

  const exam = {
    type: 'event',
    topLeft: 'MARK 101',
    main: 'Final Exam',
    bottomLeft: 'ABC 1-234',
    topRight: 'Wednesday',
  }

  const task = {
    type: 'task',
    topLeft: "DEV 101",
    main: "Review Reading 2",
    topRight: "Due Today",
    bottomRight: "Priority: Low"
  }

  const overdueTask = {
    type: 'task',
    topLeft: "DEV 101",
    main: "Review Plan",
    topRight: "Due Yesterday",
    bottomRight: "Priority: High"
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.greeting}>Good morning, Glory.</Text>
      <Text style={styles.date}>Friday, November 28</Text>
      <Text style={styles.header}>Currently:</Text>
      <Card {...currentLecture} />
      <Text style={styles.header}>Up Next:</Text>
      <Card {...nextLecture} />
      <View style={styles.taskHeader}>
        <Text style={[styles.header, { marginBottom: 3 }]}>Today's Tasks:</Text>
        <Text style={styles.showAllButton}>SHOW ALL</Text>
      </View>
      <Text style={styles.subheader}>6 tasks due today \1 overdue\</Text>
      <Card {...overdueTask} />
      <Card {...task} />
      <Card {...task} />
      <Text style={styles.header}>Upcoming Dates:</Text>
      <Card {...exam} />
    </ScrollView>
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
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#9496A1'
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  showAllButton: {
    fontWeight: '600',
    color: '#9496A1'
  }
});
