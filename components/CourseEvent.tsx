import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type CourseEventProps = {
  eventType: string,
  time: string,
  frequency: string,
  location: string
}

export function CourseEvent(props: CourseEventProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eventType}>{props.eventType}</Text>
      <Text style={[styles.text, styles.time]}>{props.time}</Text>
      <Text style={[styles.text, styles.frequency]}>{props.frequency}</Text>
      <Text style={[styles.text, styles.location]}>{props.location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 2
  },
  eventType: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 3
  },
  time: {
    fontSize: 16
  },
  frequency: {
    fontSize: 15,
    // color: 'grey'
  },
  location: {
    color: 'grey',
    fontSize: 14
  }
})