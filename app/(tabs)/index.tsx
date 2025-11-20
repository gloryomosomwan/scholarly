import { StyleSheet, ScrollView, View, Platform, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

import TaskSection from "@/components/Dashboard/TaskSection";
import AssignmentSection from "@/components/Dashboard/AssignmentSection";
import UpNextSection from "@/components/Dashboard/UpNextSection";
import CurrentlySection from "@/components/Dashboard/CurrentlySection";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import UpcomingDatesSection from "@/components/Dashboard/UpcomingDatesSection";

import { useTheme } from "@/hooks/useTheme";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function Index() {
  const theme = useTheme()
  const insets = useSafeAreaInsets();
  let paddingTop = Platform.OS === "android" ? 0 : insets.top;
  const width = Dimensions.get('window').width
  return (
    <View style={theme.scheme === 'light' ? styles.container : { overflow: 'hidden', paddingTop: paddingTop, flex: 1 }}>
      {theme.scheme === 'light' && <BlurView intensity={70} tint='light' style={[styles.blurContainer, { height: paddingTop, width: width, }]} />}
      <ScrollView style={[styles.scrollContainer, { backgroundColor: theme.primary, paddingTop: 20 }]} contentInsetAdjustmentBehavior="automatic">
        <DashboardHeader />
        <CurrentlySection />
        <UpNextSection />
        <UpcomingDatesSection />
        <AssignmentSection />
        <TaskSection />
      </ScrollView>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    paddingHorizontal: 20,
  },
  blurContainer: {
    flex: 1,
    borderBottomWidth: 0.15,
    position: 'absolute',
    zIndex: 2,
    top: 0
  }
});