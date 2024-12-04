import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

type CourseEventProps = {
  eventType: string,
  time: string,
  frequency: string,
  location: string
}

export function CourseEvent(props: CourseEventProps) {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <Text style={styles.eventType}>{props.eventType}</Text>
        <FontAwesome name="edit" size={14} color="grey" />
      </View>
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
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})