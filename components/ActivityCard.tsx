import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { isAfter } from 'date-fns';

import { courseColors } from '@/utils/Calendar/data';
import { priorityColors } from '@/utils/themes';
import { formatTime } from '@/utils/utility'

type ActivityCardProps = {
  activity: {
    title: string;
    course?: string;
    description?: string;
    due?: Date;
    priority?: string;
  };
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [completed, setCompleted] = useState(false);
  const [overdue, setOverdue] = useState(activity.due && isAfter(new Date(), activity.due))
  const courseColor = courseColors[activity.course as keyof typeof courseColors];

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <View style={[styles.card, overdue && styles.overdueCard, completed && styles.completedCard]}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          {/* Checkbox */}
          <TouchableOpacity onPress={toggleCompleted} style={styles.checkbox}>
            <SymbolView
              name={completed ? "checkmark.circle.fill" : "circle"}
              size={20}
              tintColor={completed ? "#10B981" : "#9CA3AF"}
            />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, completed && styles.completedTitle]}>
                {activity.title}
              </Text>
              {activity.due &&
                <View style={styles.dueTimeContainer}>
                  {overdue && <SymbolView name={'exclamationmark.circle'} tintColor={'red'} size={12} />}
                  <Text style={styles.dueTime}> {formatTime(activity.due)} </Text>
                </View>
              }
            </View>

            {activity.description && (
              <Text style={styles.description}>{activity.description}</Text>
            )}

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {/* Course tag */}
              {activity.course && (
                <View style={styles.courseTag}>
                  <View style={[styles.courseDot, { backgroundColor: courseColor }]} />
                  <Text style={styles.courseText}>{activity.course}</Text>
                </View>
              )}

              {/* Task type */}
              <View style={styles.taskTypeTag}>
                <SymbolView name="target" size={12} tintColor="#2563EB" />
                <Text style={styles.taskTypeText}>assignment</Text>
              </View>

              {/* Priority tag */}
              {activity.priority && (
                <View style={[styles.priorityTag, getPriorityColor(activity.priority)]}>
                  <Text style={[styles.priorityText, getPriorityColor(activity.priority)]}>
                    {activity.priority.toUpperCase()}
                  </Text>
                </View>
              )}

              {/* Estimated time */}
              <View style={styles.timeTag}>
                <SymbolView name="clock" size={12} tintColor="#6B7280" />
                <Text style={styles.timeText}>30 min</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Completion indicator */}
        {completed && (
          <View style={styles.completionIndicator}>
            <View style={styles.completionDivider} />
            <View style={styles.completionContent}>
              <SymbolView name="checkmark.circle.fill" size={16} tintColor="#10B981" />
              <Text style={styles.completionText}>Completed</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const getPriorityColor = (priority?: string) => {
  switch (priority?.toUpperCase()) {
    case 'HIGH': return priorityColors.high;
    case 'MEDIUM': return priorityColors.medium;
    case 'LOW': return priorityColors.low;
    default: return priorityColors.default;
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  overdueCard: {
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  completedCard: {
    borderColor: '#D1FAE5',
    backgroundColor: '#F0FDF4',
  },
  cardContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    lineHeight: 20,
    marginRight: 12,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  dueTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  courseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  taskTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  taskTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1D4ED8',
    textTransform: 'capitalize',
  },
  priorityTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  completionIndicator: {
    marginTop: 12,
  },
  completionDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  completionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#059669',
  },
  dueTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});
