import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import AssessmentCard from "@/components/Dashboard/AssessmentCard";
import EventCard from "@/components/Dashboard/EventCard";
import TaskSection from "@/components/Dashboard/TaskSection";
import AssignmentSection from "@/components/Dashboard/AssignmentSection";

import { useTheme } from "@/hooks/useTheme";
import dayjs from "dayjs";

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
            <Text style={[styles.dateText, { color: theme.grey400 }]}>{dayjs().format('dddd, MMMM D')}</Text>
          </View>
          <SymbolView style={styles.profileIcon} name={'person.crop.circle.fill'} size={45} tintColor={theme.grey400} />
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
        </View>
        <AssignmentSection />
        <TaskSection />
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
    fontWeight: '600',
    letterSpacing: 0.25
  },
  subheaderText: {
    fontSize: 16,
    fontWeight: '600',
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
  start: new Date(2025, 5, 19, 23, 0),
  end: new Date(2025, 5, 20, 23, 0),
  location: 'HIS 2-17',
}

const nextLecture = {
  id: 40000,
  type: 'Lecture',
  course: 'MARK 161',
  emoji: '📊',
  start: new Date(2025, 5, 20, 22, 0),
  end: new Date(2025, 5, 20, 23, 0),
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