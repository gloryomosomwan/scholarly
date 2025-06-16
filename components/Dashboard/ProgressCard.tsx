import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react-native';

type ProgressCardProps = {
  data: {
    completedToday: number;
    totalTasks: number;
    totalEstimatedTime: number;
    overdueCount: number;
  }
}

export default function ProgressCard({ data }: ProgressCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <CheckCircle2 size={16} color="#10B981" />
          <Text style={styles.cardLabel}>Completed</Text>
        </View>
        <Text style={styles.cardValue}>{data.completedToday}/{data.totalTasks}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Clock size={16} color="#3B82F6" />
          <Text style={styles.cardLabel}>Time Left</Text>
        </View>
        <Text style={styles.cardValue}>
          {Math.floor(data.totalEstimatedTime / 60)}h {data.totalEstimatedTime % 60}m
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <AlertCircle size={16} color="#EF4444" />
          <Text style={styles.cardLabel}>Overdue</Text>
        </View>
        <Text style={styles.cardValue}>{data.overdueCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
});
