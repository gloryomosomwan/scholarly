import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/hooks';
import { Test } from '@/types';

import Graded from '@/components/CoursePage/Graded';
import TestCardMenu from '@/components/CoursePage/TestCard/TestCardMenu';
import GradeModal from '@/components/CoursePage/TestCard/GradeModal';

function getDateString(date: Date) {
  const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return day + ' at ' + time
}

export default function TestCard({ id, name, notes, startDate, endDate, location, weight, grade, courseID }: Test) {
  const theme = useTheme();
  const [gradeModalVisible, setGradeModalVisible] = useState(false)
  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
      <View style={styles.mainContentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: theme.grey200 }]}>
          <SymbolView name={"doc.text"} size={20} tintColor={theme.text} />
        </View>
        <View style={styles.mainTextContainer}>
          <Text style={[styles.titleText, { color: theme.text }]}>{name || 'Test'}</Text>
          <TestCardMenu testID={id} courseID={courseID} setGradeModalVisible={setGradeModalVisible} grade={grade} />
        </View>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'clock'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Starts: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{getDateString(startDate)}</Text>
      </View>
      <View style={styles.detailRowContainer}>
        <SymbolView name={'clock'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
        <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Ends: '}</Text>
        <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{getDateString(endDate)}</Text>
      </View>
      {
        location &&
        <View style={styles.detailRowContainer}>
          <SymbolView name={'mappin.circle'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
          <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Location: '}</Text>
          <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{location}</Text>
        </View>
      }
      {
        weight !== undefined &&
        <View style={styles.detailRowContainer}>
          <SymbolView name={'scalemass'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
          <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Weight: '}</Text>
          <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{weight}</Text>
        </View>
      }
      {
        notes &&
        <View style={styles.detailRowContainer}>
          <SymbolView name={'note.text'} size={18} tintColor={theme.grey500} style={styles.detailRowIcon} />
          <Text style={[styles.detailRowLabelText, { color: theme.grey500 }]}>{'Notes: '}</Text>
          <Text style={[styles.detailRowText, { color: theme.grey600 }]}>{notes}</Text>
        </View>
      }
      {grade && <Graded grade={grade} />}
      <GradeModal gradeModalVisible={gradeModalVisible} setGradeModalVisible={setGradeModalVisible} testID={id} />
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
});