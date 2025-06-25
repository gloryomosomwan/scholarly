import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type SubheaderProps = {
  courseName: string
  credits: string
  grade: string
}

export default function Subheader({ courseName, grade, credits }: SubheaderProps) {
  return (
    <View style={styles.container}>
      <Text>{courseName}</Text>
      <View style={styles.statRowContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>{grade}</Text>
          <Text style={styles.statLabelText}>CURRENT GRADE</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statText}>{credits}</Text>
          <Text style={styles.statLabelText}>CREDITS</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'cadetblue',
    height: 90,
  },
  statRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statContainer: {

  },
  statText: {
    fontSize: 30
  },
  statLabelText: {
    fontSize: 13
  }
})