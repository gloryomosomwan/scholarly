import React from 'react';
import { View, StyleSheet } from 'react-native';
import { isAfter } from 'date-fns';
import { eq } from 'drizzle-orm';

import AssignmentCardMenu from './AssignmentCardMenu';
import Checkbox from '@/components/ActivityCard/Checkbox';
import Description from '@/components/ActivityCard/Description';
import Title from '@/components/ActivityCard/Title';
import CourseTag from '@/components/ActivityCard/CourseTag';
import TimeTag from '@/components/ActivityCard/TimeTag';
import Due from '@/components/ActivityCard/Due';
import Completion from '@/components/ActivityCard/Completion';

import { Assignment } from '@/types';
import { useTheme } from '@/hooks';
import { getCourseById } from '@/hooks/database';
import { db } from '@/db/init';
import { assignments } from '@/db/schema';

type AssignmentCardProps = {
  assignment: Assignment;
};

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const theme = useTheme();
  const completedAt = assignment.completedAt
  const overdue = assignment.due && isAfter(new Date(), assignment.due)
  const course = getCourseById(assignment.courseID === undefined ? null : assignment.courseID)

  const toggleCompleted = async () => {
    if (completedAt) {
      await db.update(assignments).set({ completed_at: null }).where(eq(assignments.id, assignment.id))
    }
    else if (!completedAt) {
      await db.update(assignments).set({ completed_at: new Date().toISOString() }).where(eq(assignments.id, assignment.id))
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
              <Title title={assignment.title} completed={completedAt} />
              <AssignmentCardMenu assignmentID={assignment.id} />
            </View>
            {assignment.description && (<Description description={assignment.description} />)}
            <View style={styles.tagsContainer}>
              {course && (<CourseTag courseCode={course.code} courseColor={course.color} />)}
              <TimeTag />
            </View>
            {assignment.due && <Due due={assignment.due} />}
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
