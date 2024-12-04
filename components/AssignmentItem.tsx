import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type AssignmentItemProps = {
  title: string,
  dueDate: string,
  dueTime: string,
}

export function AssignmentItem(props: AssignmentItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={[styles.text, styles.dueDate]}>{props.dueDate}</Text>
      <Text style={[styles.text, styles.dueTime]}>{props.dueTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  text: {
    marginBottom: 2
  },
  title: {

  },
  dueDate: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 3
  },
  dueTime: {

  }
})