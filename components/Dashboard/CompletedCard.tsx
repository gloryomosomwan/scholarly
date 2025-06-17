import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

type CompletedCardProps = {
  completedToday: number;
  totalTasks: number;
};

export default function CompletedCard({ completedToday, totalTasks }: CompletedCardProps) {
  const completionPercentage = totalTasks > 0 ? (completedToday / totalTasks) * 100 : 0;

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardContent, { backgroundColor: 'white' }]}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <SymbolView name={'checkmark.circle'} tintColor={'#10B981'} />
          </View>
          <Text style={[styles.label, { color: '#9CA3AF' }]}>Tasks</Text>
        </View>
        <Text style={[styles.value, { color: '#374151' }]}>{completedToday}/{totalTasks}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBackground, { backgroundColor: '#E5E7EB' }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: '#10B981', width: `${Math.min(completionPercentage, 100)}%` }
              ]}
            />
          </View>
          <Text style={[styles.percentage, { color: '#6B7280' }]}>
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
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  label: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  value: {
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
  percentage: {
    fontSize: 12,
    minWidth: 32,
    textAlign: 'right',
  },
});
