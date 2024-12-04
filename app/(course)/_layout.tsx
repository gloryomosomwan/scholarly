import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { useNavigation, withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { navigate } from "expo-router/build/global-state/routing";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs screenOptions={{ title: 'TopTabsTitle' }}>
      <MaterialTopTabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <MaterialTopTabs.Screen name="assignments" options={{ title: "Assignments" }} />
      <MaterialTopTabs.Screen name="exams" options={{ title: "Exams" }} />
    </MaterialTopTabs >
  );
}