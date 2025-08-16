import React from 'react';
import { View, StyleSheet } from 'react-native';
import { isAfter } from 'date-fns';
import { eq } from 'drizzle-orm';

import TaskCardMenu from '@/components/Task/TaskCardMenu';
import Checkbox from '@/components/ActivityCard/Checkbox';
import Description from '@/components/ActivityCard/Description';
import Title from '@/components/ActivityCard/Title';
import CourseTag from '@/components/ActivityCard/CourseTag';
import PriorityTag from '@/components/ActivityCard/PriorityTag';
import TimeTag from '@/components/ActivityCard/TimeTag';
import Due from '@/components/ActivityCard/Due';
import Completion from '@/components/ActivityCard/Completion';

import { Task } from '@/types';
import { useTheme } from '@/hooks';
import { getCourseById } from '@/hooks/database';
import { db } from '@/db/init';
import { tasks } from '@/db/schema';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const theme = useTheme();
  const completedAt = task.completedAt
  const overdue = task.due && isAfter(new Date(), task.due)
  const course = getCourseById(task.courseID === undefined ? null : task.courseID)

  const toggleCompleted = async () => {
    if (completedAt) {
      await db.update(tasks).set({ completedAt: null }).where(eq(tasks.id, task.id))
    }
    else if (!completedAt) {
      await db.update(tasks).set({ completedAt: new Date().toISOString() }).where(eq(tasks.id, task.id))
    }
  };

  return (
    <View style={[
      styles.card,
      { backgroundColor: theme.secondary, borderColor: theme.grey200 },
      overdue && [{ backgroundColor: theme.dangerBackground, borderColor: theme.dangerBorder }],
      completedAt && [{ backgroundColor: theme.successBackground, borderColor: theme.successBorder }]
    ]}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Checkbox completed={completedAt} toggleCompleted={toggleCompleted} />
          <View style={styles.content}>

            <View style={styles.titleRow}>
              <Title title={task.title} completed={completedAt} />
              <TaskCardMenu taskID={task.id} />
            </View>

            {task.description && (<Description description={task.description} />)}

            <View style={styles.tagsContainer}>
              {course && (<CourseTag courseCode={course.code} courseColor={course.color} />)}
              {task.priority && (<PriorityTag priority={task.priority} />)}
              <TimeTag />
            </View>

            {task.due && <Due due={task.due} />}
          </View>
        </View>
        {completedAt && (<Completion />)}
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
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  tagsContainer: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
