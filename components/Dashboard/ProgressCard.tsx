import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/utils/useTheme';

type ProgressCardProps = {
  completedToday: number;
  totalTasks: number;
  type: string
};

export default function ProgressCard({ completedToday, totalTasks, type }: ProgressCardProps) {
  const completionPercentage = totalTasks > 0 ? (completedToday / totalTasks) * 100 : 0;
  const theme = useTheme()

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardContent, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <SymbolView name={type === 'tasks' ? 'checklist' : 'doc.text'} tintColor={theme.accent} />
          </View>
          <Text style={[styles.itemTypeText, { color: theme.text }]}>{type === 'tasks' ? 'TASKS' : 'ASSIGNMENTS'}</Text>
        </View>
        <Text style={[styles.quotientText, { color: theme.text }]}>{completedToday}/{totalTasks}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBackground, { backgroundColor: '#E5E7EB' }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: theme.accent, width: `${Math.min(completionPercentage, 100)}%` }
              ]}
            />
          </View>
          <Text style={[styles.percentageText, { color: theme.text }]}>
            {Math.round(completionPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  itemTypeText: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  quotientText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBackground: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  percentageText: {
    fontSize: 12,
    minWidth: 32,
    textAlign: 'right',
  },
});
