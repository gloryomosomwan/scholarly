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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'today':
        return {
          backgroundColor: theme.accent + '15',
          borderColor: theme.accent + '30',
          textColor: theme.accent
        };
      case 'upcoming':
        return {
          backgroundColor: theme.grey400 + '15',
          borderColor: theme.grey400 + '30',
          textColor: theme.grey400
        };
      case 'available':
        return {
          backgroundColor: theme.success + '15',
          borderColor: theme.success + '30',
          textColor: theme.success
        };
      default:
        return {
          backgroundColor: theme.grey400 + '15',
          borderColor: theme.grey400 + '30',
          textColor: theme.grey400
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture': return 'book';
      case 'lab': return 'flask';
      case 'office hours': return 'person.2';
      default: return 'calendar';
    }
  };

  const statusColors = getStatusColor(schedule.status);

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.secondary, borderColor: theme.grey400 }]}>
      <View style={styles.headerContainer}>
        <View style={styles.typeContainer}>
          <View style={[styles.iconContainer, { backgroundColor: theme.accent }]}>
            <SymbolView
              name={getTypeIcon(schedule.type)}
              size={20}
              tintColor={theme.accent}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.typeText, { color: theme.text }]}>{schedule.type}</Text>
            <Text style={[styles.topicText, { color: theme.grey200 }]}>{schedule.topic}</Text>
          </View>
        </View>
        <View style={[
          styles.statusContainer,
          {
            backgroundColor: statusColors.backgroundColor,
            borderColor: statusColors.borderColor
          }
        ]}>
          <Text style={[styles.statusText, { color: statusColors.textColor }]}>
            {schedule.status === 'today' ? 'Today' : schedule.status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <SymbolView name="clock" size={16} tintColor={theme.grey200} />
          <Text style={[styles.detailText, { color: theme.grey200 }]}>{schedule.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <SymbolView name="calendar" size={16} tintColor={theme.grey200} />
          <Text style={[styles.detailText, { color: theme.grey200 }]}>{schedule.days}</Text>
        </View>
        <View style={styles.detailRow}>
          <SymbolView name="location" size={16} tintColor={theme.grey200} />
          <Text style={[styles.detailText, { color: theme.grey200 }]}>{schedule.location}</Text>
        </View>
      </View>

      {schedule.status === 'today' && (
        <View style={styles.actionContainer}>
          <View style={[styles.dividerContainer, { backgroundColor: theme.grey400 }]} />
          <TouchableOpacity
            style={[styles.joinButton, { backgroundColor: theme.accent }]}
            onPress={onJoinPress}
          >
            <Text style={[styles.joinButtonText, { color: theme.inverseText }]}>
              Join Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
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
    width: 40,
    height: 40,
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