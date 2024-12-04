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
      <Text>{props.eventType}</Text>
      <Text>{props.time}</Text>
      <Text>{props.frequency}</Text>
      <Text>{props.location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
})