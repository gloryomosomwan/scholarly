import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import { isSameDay } from 'date-fns';

import { useTheme } from '@/hooks/useTheme';
import ActivityCard from '@/components/Activity/ActivityCard';
import { tasks } from '@/data/data'

export default function Tab() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const todayTasks = tasks.filter((task) => {
    if (!task.due) return;
    return isSameDay(new Date(), task.due)
  })

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
            <SymbolView name={'arrow.up.arrow.down'} tintColor={theme.accent} />
          </Pressable>
        </View>
      </View>
      <ScrollView style={[styles.tasksContainer, {}]} contentInsetAdjustmentBehavior="automatic">
        {todayTasks.map((task) => <ActivityCard key={task.id} activity={task} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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