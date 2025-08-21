import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AssessmentCard from "@/components/Dashboard/AssessmentCard";
import TaskSection from "@/components/Dashboard/TaskSection";
import AssignmentSection from "@/components/Dashboard/AssignmentSection";
import UpNextSection from "@/components/Dashboard/UpNextSection";
import CurrentEventSection from "@/components/Dashboard/CurrentEventSection";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

import { useTheme } from "@/hooks/useTheme";

export default function Index() {
  const theme = useTheme()
  const insets = useSafeAreaInsets();
  let paddingTop = Platform.OS === "android" ? 0 : insets.top;
  return (
    <View style={{ overflow: 'hidden', paddingTop: paddingTop + 25 }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} contentInsetAdjustmentBehavior="automatic">
        <DashboardHeader />
        <CurrentEventSection />
        <UpNextSection />
        <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates:</Text>
        <AssessmentCard assessment={exam} />
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
  headerText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25
  },
});

const exam = {
  type: 'Final Exam',
  course: 'MATH 119',
  emoji: '➕',
  start: new Date(2025, 5, 21, 13, 0),
  end: new Date(2025, 5, 21, 15, 0),
  location: 'GMH 5-18',
}