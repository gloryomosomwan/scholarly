import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

type TimeLeftCardProps = {
  totalEstimatedTime: number;
  elapsedTime?: number;
};

export default function TimeLeftCard({ totalEstimatedTime, elapsedTime = 0 }: TimeLeftCardProps) {
  // Format time (assuming totalEstimatedTime is in minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Calculate progress percentage
  const progressPercentage = totalEstimatedTime > 0 ? (elapsedTime / totalEstimatedTime) * 100 : 0;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <SymbolView name={'clock'} tintColor={'#3B82F6'} />
          </View>
          <Text style={styles.label}>Time Left</Text>
        </View>

        <Text style={styles.value}>{formatTime(totalEstimatedTime - elapsedTime)}</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressPercentage, 100)}%` }
              ]}
            />
          </View>
          <Text style={styles.percentage}>{Math.round(progressPercentage)}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'white',
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
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  floatingTop: {
    width: 24,
    height: 24,
    top: 8,
    right: 8,
  },
  floatingBottom: {
    width: 16,
    height: 16,
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  value: {
    color: '#374151',  // Changed to darker grey
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
    backgroundColor: '#E5E7EB',  // Light grey background for progress bar
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: '#3B82F6',  // Changed to blue
    borderRadius: 2,
  },
  percentage: {
    color: '#6B7280',  // Changed to medium grey
    fontSize: 12,
    minWidth: 32,
    textAlign: 'right',
  },
});
