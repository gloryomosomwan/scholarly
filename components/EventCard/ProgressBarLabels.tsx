import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { getOccurrences } from '@/utils/event'

type ProgressBarLabelsProps = {
  startDate: Date
  endDate: Date
  recurrenceString: string | undefined
}

export default function ProgressBarLabels({ startDate, endDate, recurrenceString }: ProgressBarLabelsProps) {
  const theme = useTheme()
  const now = new Date()
  const recurringStartDates = recurrenceString ? getOccurrences(recurrenceString) : null
  let elapsed: number;
  let remaining: number;
  if (recurringStartDates) {
    elapsed = now.getTime() - recurringStartDates[0].getTime()
    const offset = endDate.getTime() - startDate.getTime()
    const recurringEndDate = recurringStartDates[0].getTime() + offset
    remaining = recurringEndDate - now.getTime()
  }
  else {
    elapsed = now.getTime() - startDate.getTime()
    remaining = endDate.getTime() - now.getTime();
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.grey500 }]}>
        {formatElapsedTime(elapsed)}
      </Text>
      <Text style={[styles.label, { color: theme.grey500 }]}>
        {remaining > 0 ? formatRemainingTime(remaining) : 'Complete'}
      </Text>
    </View>
  )
}

const formatRemainingTime = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m left`;
  }
  return `${remainingMinutes} minutes left`;
};

const formatElapsedTime = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m elapsed`;
  }
  return `${remainingMinutes}m elapsed`;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
})