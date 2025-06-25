import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator, } from "@react-navigation/material-top-tabs";
import { withLayoutContext, useLocalSearchParams } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";

import Subheader from "@/components/CoursePage/Subheader";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { courseName, credits, grade } = useLocalSearchParams<{ courseName: string, credits: string, grade: string }>()

  return (
    <SafeAreaView style={styles.container}>
      <Subheader courseName={courseName} credits={credits} grade={grade} />
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="schedule" options={{ title: "Schedule" }} />
        <MaterialTopTabs.Screen name="assignments" options={{ title: "Assignments" }} />
        <MaterialTopTabs.Screen name="exams" options={{ title: "Exams" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});