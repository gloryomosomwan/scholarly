import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SFSymbol, SymbolView } from 'expo-symbols';

type EventCardProps = {
  event: {
    type: string;
    course: string;
    icon: SFSymbol;
    location: string;
    start: Date;
    end: Date;
  };
};

const formatTime = (time: Date) => {
  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const formatTimeRange = (start: Date, end: Date) => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EC4899', '#DB2777']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.leftContent}>
              <Text style={styles.eventType}>{event.type}</Text>
              <View style={styles.courseContainer}>
                <SymbolView
                  name={event.icon}
                  size={24}
                  tintColor="#FFFFFF"
                  style={styles.courseIcon}
                />
                <Text style={styles.courseName}>{event.course}</Text>
              </View>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.timeRange}>
                {formatTimeRange(event.start, event.end)}
              </Text>
              <Text style={styles.timeAgo}>
                {getTimeAgo(event.start)}
              </Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{event.location}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  eventType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FECACA',
    marginBottom: 4,
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseIcon: {
    marginRight: 4,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timeRange: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  timeAgo: {
    fontSize: 14,
    color: '#FECACA',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F9A8D4',
  },
  locationText: {
    fontSize: 14,
    color: '#FECACA',
  },
});

// Sample props object to pass in
const sampleEventData: EventCardProps = {
  event: {
    type: 'Lecture',
    course: 'HIST 211',
    icon: 'book.fill' as SFSymbol,
    location: 'HIS 2-17',
    start: new Date(2024, 10, 26, 12, 0), // Nov 26, 2024 12:00 PM
    end: new Date(2024, 10, 26, 18, 0),   // Nov 26, 2024 6:00 PM
  }
};