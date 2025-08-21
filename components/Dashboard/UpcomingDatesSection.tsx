import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AssessmentCard from '@/components/Dashboard/AssessmentCard'

import { useTheme } from '@/hooks/useTheme'

type UpcomingDatesSectionProps = {

}
const exam = {
  type: 'Final Exam',
  course: 'MATH 119',
  emoji: '➕',
  start: new Date(2025, 5, 21, 13, 0),
  end: new Date(2025, 5, 21, 15, 0),
  location: 'GMH 5-18',
}

export default function UpcomingDatesSection({ }: UpcomingDatesSectionProps) {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.text }]}>Upcoming Dates:</Text>
      <AssessmentCard assessment={exam} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  headerText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25
  },
})