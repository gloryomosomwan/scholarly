import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'powderblue',
      // headerTransparent: true,
      // tabBarPosition: 'top',
      // headerShown: false,
      headerBackground: () => (
        <BlurView
          intensity={50}
          tint='light'
          style={StyleSheet.absoluteFill}
        />
      ),
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
      {/* <Tabs.Screen
        name="coursePage"
        options={{
          title: 'Course Page',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="amazon" color={color} />,
        }}
      /> */}
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
