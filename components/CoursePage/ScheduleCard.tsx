import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/utils/useTheme';

export type ScheduleCardProps = {
  schedule: {
    id: number;
    type: string;
    time: string;
    days: string;
    location: string;
    status: 'today' | 'upcoming' | 'available';
    topic: string;
  };
};

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  const theme = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture': return 'book';
      case 'lab': return 'flask';
      case 'office hours': return 'person.2';
      default: return 'calendar';
    }
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
      <View style={styles.headerContainer}>
        <View style={styles.typeContainer}>
          <View style={[styles.iconContainer, { backgroundColor: theme.grey200 }]}>
            <SymbolView name={getTypeIcon(schedule.type)} size={20} tintColor={theme.text} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.typeText, { color: theme.text }]}>{schedule.type}</Text>
          </View>
        </View>
        <SymbolView name={'ellipsis'} size={20} tintColor={theme.grey400} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <SymbolView name="clock" size={16} tintColor={theme.grey600} />
          <Text style={[styles.detailText, { color: theme.grey600 }]}>{schedule.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <SymbolView name="calendar" size={16} tintColor={theme.grey600} />
          <Text style={[styles.detailText, { color: theme.grey600 }]}>{schedule.days}</Text>
        </View>
        <View style={styles.detailRow}>
          <SymbolView name="mappin.circle.fill" size={16} tintColor={theme.grey600} />
          <Text style={[styles.detailText, { color: theme.grey600 }]}>{schedule.location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginLeft: 10
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  detailsContainer: {},
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
    marginLeft: 10
  },
});