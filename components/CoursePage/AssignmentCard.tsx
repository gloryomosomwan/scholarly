import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/utils/useTheme';

export type AssignmentCardProps = {
  assignment: {
    id: number
    title: string
    description: string
    due: Date
    courseWeight: string
  };
};

function getDateString(date: Date) {
  const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return day + ' at ' + time
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const theme = useTheme();
  const [completed, setCompleted] = useState(true)

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: theme.grey200 }]}>
          <SymbolView name={"doc.text"} size={20} tintColor={theme.text} />
        </View>
        <View style={styles.mainTextContainer}>
          <Text style={[styles.titleText, { color: theme.text }]}>{assignment.title}</Text>
        </View>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'note.text'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Notes: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{assignment.description}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'clock'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Due: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{getDateString(assignment.due)}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'scalemass'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Weight: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{assignment.courseWeight}</Text>
      </View>
      {/* <View style={[styles.divider, { backgroundColor: theme.grey200 }]} /> */}
      {
        completed ?
          <View style={[styles.completionContent, { backgroundColor: theme.successBackground }]}>
            <SymbolView name="checkmark.circle.fill" size={16} tintColor={theme.success} style={styles.completionIcon} />
            <Text style={[styles.completionText, { color: theme.successText }]}>Completed</Text>
          </View>
          :
          <Pressable style={[styles.doneButton, { backgroundColor: theme.accent }]}>
            <Text style={[styles.doneText, { color: 'white' }]}>Mark Done</Text>
          </Pressable>
      }
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
  mainContentContainer: {
    marginBottom: 15,
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
  mainTextContainer: {
    marginLeft: 10
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
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
  descriptionText: {
    fontSize: 14,
    fontWeight: '400'
  },
  detailRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailRowIcon: {
    marginRight: 5,
  },
  detailRowLabelText: {
    fontWeight: '500',
    fontSize: 15
  },
  detailRowText: {
    fontWeight: '500',
    fontSize: 15,
  },
  // divider: {
  //   height: 1,
  //   marginBottom: 12
  // },
  doneButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  doneText: {
    fontWeight: '500',
  },
  completionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  completionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  completionIcon: {
    marginRight: 6
  },
});