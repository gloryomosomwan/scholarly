import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/utils/useTheme';
import { Exam } from '@/types';

function getDateString(date: Date) {
  const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return day + ' at ' + time
}

export default function ExamCard({ title, notes, start, end, location, weight, grade }: Exam) {
  const theme = useTheme();
  const [graded, setGraded] = useState(grade ? true : false)

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: theme.grey200 }]}>
          <SymbolView name={"doc.text"} size={20} tintColor={theme.text} />
        </View>
        <View style={styles.mainTextContainer}>
          <Text style={[styles.titleText, { color: theme.text }]}>{title}</Text>
          <SymbolView name={'ellipsis'} size={20} tintColor={theme.grey400} />
        </View>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'clock'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Starts: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{getDateString(start)}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'clock'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Ends: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{getDateString(end)}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'mappin.circle'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Location: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{location}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'scalemass'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Weight: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{weight}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'note.text'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Notes: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{notes}</Text>
      </View>
      {
        graded &&
        <View style={[styles.gradeContainer, { backgroundColor: theme.successBackground }]} >
          <Text style={[styles.gradeLabelText, { color: theme.successText }]}>Grade</Text>
          <Text style={[styles.gradeText, { color: theme.successText }]}>{grade}</Text>
        </View>
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
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
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
  gradeContainer: {
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  gradeLabelText: {
    fontSize: 20,
    fontWeight: '600'
  },
  gradeText: {
    fontSize: 20,
    fontWeight: '600'
  }
});