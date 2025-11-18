import { SymbolView } from 'expo-symbols'
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/hooks';

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.accent,
      tabBarInactiveTintColor: theme.grey400,
      headerBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={[StyleSheet.absoluteFill]}
        />
      ),
      // tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: theme.primary, borderColor: theme.primary, display: 'flex', paddingHorizontal: 5 },
      tabBarIconStyle: { top: 5 },
      tabBarLabelStyle: { top: 10 },
      headerShown: false,
      sceneStyle: { backgroundColor: theme.primary }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={33} name="square.grid.2x2" tintColor={color} />,
          title: 'Dashboard'
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={33} name="calendar" tintColor={color} />,
          title: 'Calendar'
        }}
      />
      <Tabs.Screen
        name="(semester)"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={33} name="graduationcap.fill" tintColor={color} />,
          title: 'Semester'
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={33} name="checklist" tintColor={color} />,
          title: 'Tasks'
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SymbolView size={33} name="gearshape" tintColor={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
