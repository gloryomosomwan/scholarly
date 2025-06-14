import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@/utils/useTheme';

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.accent,
      headerBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={[StyleSheet.absoluteFill]}
        />
      ),
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: theme.primary, borderColor: theme.primary, display: 'flex' },
      tabBarIconStyle: { top: 15 }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ }) => <FontAwesome size={28} name="home" color={theme.text} />,
          headerShown: false,
          tabBarItemStyle: { justifyContent: 'flex-end' },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ }) => <FontAwesome size={28} name="home" color={theme.text} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          headerShown: false,
          tabBarIcon: ({ }) => <FontAwesome size={28} name="book" color={theme.text} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ }) => <FontAwesome size={28} name="cog" color={theme.text} />,
        }}
      />
    </Tabs>
  );
}
