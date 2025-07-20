import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { isAfter, format } from 'date-fns';

import { useTheme, usePriorityPalette } from '@/hooks';
import { courses } from '@/data/data';
import ActivityMenu from '@/components/Menus/ActivityMenu';

type ActivityCardProps = {
  activity: {
    id: number,
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
  const color = activity.course && courses.find(course => course.code === activity.course)?.color
  const theme = useTheme()
  const priorityPalette = usePriorityPalette(activity.priority)

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <View style={[
      styles.card,
      { backgroundColor: theme.secondary, borderColor: theme.grey200 },
      overdue && [{ backgroundColor: theme.dangerBackground, borderColor: theme.dangerBorder }],
      completed && [{ backgroundColor: theme.successBackground, borderColor: theme.successBorder }]
    ]}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          {/* Checkbox */}
          <TouchableOpacity onPress={toggleCompleted} style={styles.checkbox}>
            <SymbolView
              name={completed ? "checkmark.circle.fill" : "circle"}
              size={20}
              tintColor={completed ? theme.success : theme.grey400}
            />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.text }, completed && [styles.completedTitle, { color: theme.grey500 }]]}>
                {activity.title}
              </Text>
              {/* Edit Button */}
              {/* <Pressable style={styles.editButton}>
                <SymbolView name={'ellipsis'} size={20} tintColor={theme.grey400} />
              </Pressable> */}
              <ActivityMenu activityID={activity.id} />
            </View>

            {/* Description */}
            {activity.description && (
              <Text style={[styles.description, { color: theme.grey500 }]}>{activity.description}</Text>
            )}

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {/* Course tag */}
              {activity.course && (
                <View style={[styles.courseTag, { backgroundColor: theme.grey100 }]}>
                  {color && <View style={[styles.courseDot, { backgroundColor: color }]} />}
                  <Text style={[styles.courseText, { color: theme.text }]}>{activity.course}</Text>
                </View>
              )}

              {/* Priority tag */}
              {activity.priority && (
                <View style={[styles.priorityTag, { backgroundColor: priorityPalette.backgroundColor, borderColor: priorityPalette.borderColor }]}>
                  <Text style={[styles.priorityText, { color: priorityPalette.color }]}>
                    {activity.priority.toUpperCase()}
                  </Text>
                </View>
              )}

              {/* Estimated time */}
              <View style={styles.timeTag}>
                <SymbolView name="clock" size={12} tintColor={theme.grey500} />
                <Text style={[styles.timeText, { color: theme.text }]}>30 min</Text>
              </View>
            </View>

            {activity.due &&
              <View style={styles.dueContainer}>
                <View style={styles.dueDateContainer}>
                  <SymbolView name="calendar" size={15} tintColor={theme.grey500} />
                  <Text style={[styles.dueText, { color: theme.grey600 }]}>{format(activity.due, 'MMM d')}</Text>
                </View>
                <View style={styles.dueTimeContainer}>
                  <SymbolView name="clock" size={15} tintColor={theme.grey500} />
                  <Text style={[styles.dueText, { color: theme.grey600 }]}>{format(activity.due, 'h:mm a')}</Text>
                </View>
              </View>
            }
          </View>
        </View>

        {/* Completion indicator */}
        {completed && (
          <View style={styles.completionIndicator}>
            <View style={[styles.completionDivider, { backgroundColor: theme.grey200 }]} />
            <View style={styles.completionContent}>
              <SymbolView name="checkmark.circle.fill" size={16} tintColor={theme.success} />
              <Text style={[styles.completionText, { color: theme.successText }]}>Completed</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
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
  cardContent: {
    // flex: 1,
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
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginRight: 12,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  editButton: {
    transform: [{ rotate: '90deg' }]
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  tagsContainer: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseTag: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  completionIndicator: {
    marginTop: 12,
  },
  completionDivider: {
    height: 1,
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
  },
  dueContainer: {
    flexDirection: 'row',
    gap: 4
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 5
  },
  dueTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginRight: 5
  },
  dueText: {
    fontSize: 13
  }
});
