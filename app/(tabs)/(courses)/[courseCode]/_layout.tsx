import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator, } from "@react-navigation/material-top-tabs";
import { withLayoutContext, useLocalSearchParams } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";

import { useTheme } from "@/hooks";
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
  const { courseName, credits, grade, color } = useLocalSearchParams<{ courseName: string, credits: string, grade: string, color: string }>()
  const theme = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <Subheader courseName={courseName} credits={credits} grade={grade} />
      <MaterialTopTabs screenOptions={{
        tabBarStyle: { backgroundColor: theme.secondary },
        tabBarLabelStyle: { color: theme.text },
        tabBarItemStyle: { flexDirection: 'row' },
        tabBarIndicatorStyle: { backgroundColor: color }
      }}>
        <MaterialTopTabs.Screen name="schedule" options={{
          title: "Schedule",
          tabBarIcon: () => <SymbolView size={20} name="calendar" tintColor={color} />,
        }
        } />
        <MaterialTopTabs.Screen name="assignments" options={{
          title: "Assignments",
          tabBarIcon: () => <SymbolView size={20} name="square.and.pencil" tintColor={color} />,
        }} />
        <MaterialTopTabs.Screen name="exams" options={{
          title: "Exams",
          tabBarIcon: () => <SymbolView size={20} name="doc.text" tintColor={color} />,
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