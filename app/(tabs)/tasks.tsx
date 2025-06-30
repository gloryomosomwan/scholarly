import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/utils/useTheme';
import ActivityCard from '@/components/ActivityCard';
import { SymbolView } from 'expo-symbols';

export default function Tab() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]} >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Tasks</Text>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.buttonContainer}>
            <SymbolView name={'tray'} tintColor={theme.accent} />
          </Pressable>
          <Pressable style={styles.buttonContainer}>
            <SymbolView name={'line.3.horizontal.decrease'} tintColor={theme.accent} />
          </Pressable>
          <Pressable style={styles.buttonContainer}>
            <SymbolView name={'arrow.up.and.down'} tintColor={theme.accent} />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.tasksContainer} contentInsetAdjustmentBehavior="automatic">
        {tasks.map((task) => <ActivityCard key={task.id} activity={task} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  headerText: {
    fontSize: 45,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  tasksContainer: {
    paddingHorizontal: 20,
  },
});

const tasks = [
  {
    id: 50,
    title: 'Record a voice memo explaining electromagnetic fields for PHYS 102',
    course: 'PHYS 102',
    due: new Date(2025, 9, 19, 23, 59),
    priority: 'low',
  },
  {
    id: 73,
    title: 'Storyboard a 30-second marketing video for MARK 161',
    course: 'MARK 161',
    description: 'Draft key messaging points',
    due: new Date(2025, 9, 19, 21, 0),
    priority: 'high',
  },
  {
    id: 74,
    title: 'Compose a summary blog post on series convergence for MATH 119',
    course: 'MATH 119',
    description: 'Include references to lecture examples',
    due: new Date(2025, 9, 19, 23, 59),
    priority: 'medium',
  },
  {
    id: 75,
    title: 'Outline essay on the French Revolution',
    course: 'HIST 211',
    due: new Date(2025, 9, 20, 18, 0),
    priority: 'medium',
  },
  {
    id: 76,
    title: 'Review lab safety protocols',
    course: 'CHEM 105',
    description: 'Focus on handling of acids',
    due: new Date(2025, 9, 20, 22, 0),
    priority: 'high',
  },
  {
    id: 77,
    title: 'Practice limit problems from Chapter 3',
    course: 'MATH 119',
    due: new Date(2025, 9, 21, 12, 0),
    priority: 'medium',
  },
  {
    id: 78,
    title: 'Watch lecture video on wave-particle duality',
    course: 'PHYS 102',
    due: new Date(2025, 9, 21, 16, 30),
    priority: 'low',
  },
  {
    id: 79,
    title: "Analyze a competitor's social media campaign",
    course: 'MARK 161',
    description: 'Pick a well-known brand and document their strategy',
    due: new Date(2025, 9, 22, 14, 0),
    priority: 'high',
  },
  {
    id: 80,
    title: 'Find three primary sources for the research paper',
    course: 'HIST 211',
    due: new Date(2025, 9, 22, 23, 59),
    priority: 'medium',
  },
  {
    id: 81,
    title: 'Create flashcards for polyatomic ions',
    course: 'CHEM 105',
    due: new Date(2025, 9, 23, 10, 0),
    priority: 'low',
  },
  {
    id: 82,
    title: 'Work through the proof of the mean value theorem',
    course: 'MATH 119',
    description: 'Write down each step and the justification',
    due: new Date(2025, 9, 23, 19, 0),
    priority: 'high',
  }
];
