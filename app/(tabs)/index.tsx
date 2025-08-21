import { StyleSheet, ScrollView, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TaskSection from "@/components/Dashboard/TaskSection";
import AssignmentSection from "@/components/Dashboard/AssignmentSection";
import UpNextSection from "@/components/Dashboard/UpNextSection";
import CurrentEventSection from "@/components/Dashboard/CurrentEventSection";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

import { useTheme } from "@/hooks/useTheme";
import UpcomingDatesSection from "@/components/Dashboard/UpcomingDatesSection";

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
        <UpcomingDatesSection />
        <AssignmentSection />
        <TaskSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  }
});