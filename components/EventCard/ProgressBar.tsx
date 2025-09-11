import { StyleSheet, View } from 'react-native'
import React from 'react'
import tinycolor from 'tinycolor2'

import { useTheme } from '@/hooks/useTheme'
import { getOccurrences } from '@/utils/event'

type ProgressBarProps = {
  startDate: Date
  endDate: Date
  isCurrentEvent: boolean
  courseColor: string | undefined
  recurrenceString: string | undefined
}

export default function ProgressBar({ startDate, endDate, recurrenceString, isCurrentEvent, courseColor }: ProgressBarProps) {
  const theme = useTheme()
  const now = new Date()
  const occurrences = recurrenceString ? getOccurrences(recurrenceString) : null
  const elapsed = occurrences ? now.getTime() - occurrences[0].getTime() : now.getTime() - startDate.getTime()
  const totalDuration = endDate.getTime() - startDate.getTime();
  const progressPercentage = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  return (
    <View style={styles.container}>
      <View style={[styles.background, { backgroundColor: courseColor ? tinycolor(courseColor).setAlpha(0.15).toRgbString() : theme.grey200 }]}>
        {isCurrentEvent &&
          <View
            style={[
              styles.fill,
              { width: `${progressPercentage}%`, backgroundColor: courseColor ?? theme.grey500 },
            ]}
          >
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  background: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})