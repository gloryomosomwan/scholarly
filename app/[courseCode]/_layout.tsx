import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator, } from "@react-navigation/material-top-tabs";
import { withLayoutContext, useLocalSearchParams } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";

import { useTheme } from "@/utils/useTheme";
import Subheader from "@/components/CoursePage/Subheader";
import { SymbolView } from "expo-symbols";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { courseName, credits, grade } = useLocalSearchParams<{ courseName: string, credits: string, grade: string }>()
  const theme = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <Subheader courseName={courseName} credits={credits} grade={grade} />
      <MaterialTopTabs screenOptions={{
        tabBarStyle: { backgroundColor: theme.secondary },
        tabBarLabelStyle: { color: theme.text },
        tabBarItemStyle: { flexDirection: 'row' },
      }}>
        <MaterialTopTabs.Screen name="schedule" options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => <SymbolView size={20} name="calendar" tintColor={color} />,
        }
        } />
        <MaterialTopTabs.Screen name="assignments" options={{
          title: "Assignments",
          tabBarIcon: ({ color }) => <SymbolView size={20} name="doc.text" tintColor={color} />,
        }} />
        <MaterialTopTabs.Screen name="exams" options={{
          title: "Exams",
          tabBarIcon: ({ color }) => <SymbolView size={20} name="graduationcap" tintColor={color} />,
        }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});