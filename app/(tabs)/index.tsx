import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";

import { useTheme } from "@/utils/useTheme";

import { Card } from '@/components/Card'
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const theme = useTheme()
  const insets = useSafeAreaInsets();
  let paddingTop = Platform.OS === "android" ? 0 : insets.top;

  return (
    <View style={{ overflow: 'hidden', paddingTop: paddingTop }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} contentInsetAdjustmentBehavior="automatic">
        <Text style={[styles.greetingText, { color: theme.text }]}>Good morning, Glory 👋</Text>
        <Text style={[styles.dateText, { color: theme.tertiary }]}>Friday, November 28</Text>
        <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
        <Card {...currentLecture} />
        <Text style={[styles.headerText, { color: theme.text }]}>Up Next:</Text>
        <Card {...nextLecture} />
        <View style={styles.tasksHeaderContainer}>
          <View style={styles.tasksHeaderTopRowContainer}>
            <Text style={[styles.taskHeaderText, { color: theme.text }]}>Today's Tasks:</Text>
            <Text style={[styles.showAllButton, { color: theme.tertiary }]}>SHOW ALL</Text>
          </View>
          <Text style={[styles.subheaderText, { color: theme.tertiary }]}>6 tasks due today \1 overdue\</Text>
        </View>
        <Card {...overdueTask} />
        <Card {...task} />
        <Card {...task} />
        <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates:</Text>
        <Card {...exam} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: '600'
  },
  dateText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  headerText: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '600'
  },
  taskHeaderText: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: '600'
  },
  subheaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tasksHeaderContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  tasksHeaderTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  showAllButton: {
    fontWeight: '600',
  }
});
