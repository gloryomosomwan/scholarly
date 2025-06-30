import { SymbolView } from 'expo-symbols'
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/utils/useTheme';

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
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: theme.primary, borderColor: theme.primary, display: 'flex' },
      tabBarIconStyle: { top: 15 },
      headerShown: false,
      sceneStyle: { backgroundColor: theme.primary }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={35} name="square.grid.2x2" tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={35} name="calendar" tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="(courses)"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={35} name="book" tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon: ({ color }) => <SymbolView size={35} name="checklist" tintColor={color} />,
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SymbolView size={35} name="gearshape" tintColor={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
