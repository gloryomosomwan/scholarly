import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/utils/useTheme";
import ActivityCard from "@/components/ActivityCard";
import AssessmentCard from "@/components/Dashboard/AssessmentCard";
import ProgressCard from "@/components/Dashboard/ProgressCard";
import EventCard from "@/components/Dashboard/EventCard";
import { SymbolView } from "expo-symbols";

export default function Index() {
  const theme = useTheme()
  const insets = useSafeAreaInsets();
  let paddingTop = Platform.OS === "android" ? 0 : insets.top;

  return (
    <View style={{ overflow: 'hidden', paddingTop: paddingTop + 25 }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.headerContainer}>
          <View style={styles.greetingDateContainer}>
            <Text style={[styles.greetingText, { color: theme.text }]}>Good morning, Glory 👋</Text>
            <Text style={[styles.dateText, { color: theme.grey400 }]}>Friday, November 28</Text>
          </View>
          <SymbolView style={styles.profileIcon} name={'person.crop.circle.fill'} size={45} tintColor={'grey'} />
        </View>
        {/* <View style={styles.progressCards}>
          <ProgressCard type={'assignments'} completedToday={1} totalTasks={2} />
          <ProgressCard type={'tasks'} completedToday={1} totalTasks={4} />
        </View>
        <View>
          <Text style={[styles.headerText, { color: theme.text }]}>Currently:</Text>
          <EventCard event={currentLecture} />
        </View>
        <View>
          <Text style={[styles.headerText, { color: theme.text }]}>Up Next:</Text>
          <EventCard event={nextLecture} />
        </View>
        <View>
          <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates:</Text>
          <AssessmentCard assessment={exam} />
        </View> */}
        {/* <View>
          <View style={styles.tasksHeaderContainer}>
            <View style={styles.tasksHeaderTopRowContainer}>
              <Text style={[styles.taskHeaderText, { color: theme.text }]}>Today's Assignments:</Text>
            </View>
            <Text style={[styles.subheaderText, { color: theme.grey400 }]}>3 assignments due today (1 overdue)</Text>
          </View>
          <ActivityCard activity={assignment1} />
          <ActivityCard activity={assignment2} />
          <ActivityCard activity={assignment3} />
        </View> */}
        <View>
          <View style={styles.tasksHeaderContainer}>
            <View style={styles.tasksHeaderTopRowContainer}>
              <Text style={[styles.taskHeaderText, { color: theme.text }]}>Today's Tasks:</Text>
            </View>
            <Text style={[styles.subheaderText, { color: theme.grey400 }]}>3 tasks due today (1 overdue)</Text>
          </View>
          <ActivityCard activity={task} />
          <ActivityCard activity={task2} />
          <ActivityCard activity={task3} />
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
    marginBottom: 25,
    fontWeight: '600',
  },
  headerText: {
    marginBottom: 15,
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
  progressCards: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingDateContainer: {
    maxWidth: '80%',
  },
  profileIcon: {
    right: 10,
  },
});

const currentLecture = {
  id: 400000,
  type: 'Lecture',
  course: 'HIST 211',
  emoji: '📚',
  start: new Date(2025, 5, 18, 0, 0),
  end: new Date(2025, 5, 18, 23, 0),
  location: 'HIS 2-17',
}

const nextLecture = {
  id: 40000,
  type: 'Lecture',
  course: 'MARK 161',
  emoji: '📊',
  start: new Date(2025, 5, 19, 22, 0),
  end: new Date(2025, 5, 19, 23, 0),
  location: 'GMH 5-18',
}

const exam = {
  type: 'Final Exam',
  course: 'MATH 119',
  emoji: '➕',
  start: new Date(2025, 5, 21, 13, 0),
  end: new Date(2025, 5, 21, 15, 0),
  location: 'GMH 5-18',
}

const task = {
  id: 50,
  title: 'Record a voice memo explaining electromagnetic fields for PHYS 102',
  course: 'PHYS 102',
  due: new Date(2025, 5, 19, 23, 59),
  priority: 'low',
}
const task2 =
{
  id: 73,
  title: 'Storyboard a 30-second marketing video for MARK 161',
  course: 'MARK 161',
  description: 'Draft key messaging points',
  due: new Date(2025, 5, 19, 21, 0),
  priority: 'high',
}
const task3 =
{
  id: 74,
  title: 'Compose a summary blog post on series convergence for MATH 119',
  course: 'MATH 119',
  description: 'Include references to lecture examples',
  due: new Date(2025, 5, 19, 23, 59),
  priority: 'medium',
}

const assignment1 = {
  id: 15, title: 'Problem Set 3: Thermodynamics', course: 'CHEM 105',
  description: 'Show all work clearly',
  due: new Date(2025, 5, 18, 23, 59),
}

const assignment2 =
{
  id: 35, title: 'Reading: Electromagnetism', course: 'PHYS 102',
  description: 'Prepare questions',
  due: new Date(2025, 5, 19, 20, 0),
}

const assignment3 =
{
  id: 50, title: 'Lab Report 12: Pendulum Experiment', course: 'PHYS 102',
  description: 'Attach tables',
  due: new Date(2025, 5, 19, 23, 59),
}

const sampleProgressData = {
  completedToday: 3,
  totalTasks: 7,
  totalEstimatedTime: 145,
  overdueCount: 2
};