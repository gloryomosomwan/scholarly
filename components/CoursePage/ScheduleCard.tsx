import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  onJoinPress?: () => void;
};

export default function ScheduleCard({ schedule, onJoinPress }: ScheduleCardProps) {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  topicText: {
    fontSize: 14,
    lineHeight: 18,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
  },
  actionContainer: {
    marginTop: 12,
  },
  dividerContainer: {
    height: 1,
    marginBottom: 12,
  },
  joinButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});