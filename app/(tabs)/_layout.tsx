import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'powderblue',
      tabBarStyle: { backgroundColor: 'transparent', position: 'absolute' },
      headerStyle: { backgroundColor: 'transparent', position: 'absolute' },
      headerBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={StyleSheet.absoluteFill}
        />
      ),
      tabBarBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={StyleSheet.absoluteFill}
        />
      )
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
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
