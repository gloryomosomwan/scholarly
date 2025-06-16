import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/utils/useTheme";
import { Card } from '@/components/Card'
import ProgressCards from "@/components/Dashboard/ProgressCard";
import EventCard from "@/components/Dashboard/EventCard";
import ActivityCard from "@/components/ActivityCard";

export default function Index() {
  const theme = useTheme()
  const insets = useSafeAreaInsets();
  let paddingTop = Platform.OS === "android" ? 0 : insets.top;

  return (
    <View style={{ overflow: 'hidden', paddingTop: paddingTop + 25 }}>
      <ScrollView style={[styles.container, { backgroundColor: '#F9FAFB' }]} contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={[styles.greetingText, { color: theme.text }]}>Good morning, Glory 👋</Text>
          <Text style={[styles.dateText, { color: theme.tertiary }]}>Friday, November 28</Text>
        </View>
        <ProgressCards data={sampleProgressData} />
        <View>
          <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
          <EventCard event={currentLecture} />
        </View>
        <View>
          <Text style={[styles.headerText, { color: theme.text }]}>Up Next:</Text>
          <EventCard event={nextLecture} />
        </View>
        <View>
          <View style={styles.tasksHeaderContainer}>
            <View style={styles.tasksHeaderTopRowContainer}>
              <Text style={[styles.taskHeaderText, { color: theme.text }]}>Today's Tasks:</Text>
              <Text style={[styles.showAllButton, { color: theme.tertiary }]}>SHOW ALL</Text>
            </View>
            <Text style={[styles.subheaderText, { color: theme.tertiary }]}>6 tasks due today \1 overdue\</Text>
          </View>
          <ActivityCard activity={task} />
          <ActivityCard activity={task2} />
          <ActivityCard activity={task3} />
        </View>
        <View>
          <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates:</Text>
          <Card {...exam} />
        </View>
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

const currentLecture = {
  id: 400000, type: 'Lecture', course: 'HIST 211', emoji: '📚',
  start: new Date(2025, 5, 16, 0, 0),
  end: new Date(2025, 5, 16, 19, 0),
  location: 'HIS 2-17',
}

const nextLecture = {
  id: 40000, type: 'Lecture', course: 'MARK 161', emoji: '📊',
  start: new Date(2025, 5, 16, 20, 0),
  end: new Date(2025, 5, 16, 21, 0),
  location: 'GMH 5-18',
}

const exam = {
  type: 'event',
  topLeft: 'MARK 101',
  main: 'Final Exam',
  bottomLeft: 'ABC 1-234',
  topRight: 'Wednesday',
}

const task = {
  id: 50,
  title: 'Record a voice memo explaining electromagnetic fields for PHYS 102',
  course: 'PHYS 102',
  due: new Date(2025, 5, 12, 12, 0),
  priority: 'low',
}
const task2 =
{
  id: 73,
  title: 'Storyboard a 30-second marketing video for MARK 161',
  course: 'MARK 161',
  description: 'Draft key messaging points',
  due: new Date(2025, 4, 8, 20, 30),
  priority: 'high',
}
const task3 =
{
  id: 74,
  title: 'Compose a summary blog post on series convergence for MATH 119',
  course: 'MATH 119',
  description: 'Include references to lecture examples',
  due: new Date(2025, 5, 10, 9, 30),
  priority: 'low',
}

const overdueTask = {
  type: 'task',
  topLeft: "DEV 101",
  main: "Review Plan",
  topRight: "Due Yesterday",
  bottomRight: "Priority: High"
}

const sampleProgressData = {
  completedToday: 3,
  totalTasks: 7,
  totalEstimatedTime: 145,
  overdueCount: 2
};