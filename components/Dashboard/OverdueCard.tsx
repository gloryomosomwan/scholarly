import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols';

type OverdueCardProps = {
  overdueCount: number;
};

export default function OverdueCard({ overdueCount }: OverdueCardProps) {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#F87171', '#EF4444', '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={[styles.floatingElement, styles.floatingTop]} />
        <View style={[styles.floatingElement, styles.floatingBottom]} />

        <View style={styles.cardContent}>
          {/* Icon placeholder - you can replace with actual icon */}
          <View style={styles.iconContainer}>
            <SymbolView name={'exclamationmark.circle'} tintColor={'white'} />
          </View>

          <Text style={styles.label}>Overdue</Text>
          <Text style={styles.value}>{overdueCount}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: overdueCount > 0 ? '100%' : '0%' }
                ]}
              />
            </View>
            <Text style={styles.percentage}>{overdueCount > 0 ? '!' : '0%'}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
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
  cardContent: {
    position: 'relative',
    zIndex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    color: 'white',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  percentage: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    minWidth: 32,
    textAlign: 'right',
  },
});
