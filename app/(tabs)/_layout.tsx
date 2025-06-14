import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/utils/useTheme';

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.text,
      tabBarInactiveTintColor: theme.tertiary,
      headerBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={[StyleSheet.absoluteFill]}
        />
      ),
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: theme.primary, borderColor: theme.primary, display: 'flex' },
      tabBarIconStyle: { top: 15 },
      sceneStyle: { backgroundColor: theme.primary }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
