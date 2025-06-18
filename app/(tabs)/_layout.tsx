import { SymbolView } from 'expo-symbols'
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/utils/useTheme';

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.text,
      tabBarInactiveTintColor: theme.primary,
      headerBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={[StyleSheet.absoluteFill]}
        />
      ),
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: '#F9FAFB', borderColor: theme.primary, display: 'flex' },
      tabBarIconStyle: { top: 15 },
      sceneStyle: { backgroundColor: '#F9FAFB' }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <SymbolView size={35} name="square.grid.2x2" tintColor={theme.accent} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <SymbolView size={35} name="calendar" tintColor={theme.accent} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          headerShown: false,
          tabBarIcon: ({ color }) => <SymbolView size={35} name="book" tintColor={theme.accent} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SymbolView size={35} name="gearshape" tintColor={theme.accent} />,
        }}
      />
    </Tabs>
  );
}
