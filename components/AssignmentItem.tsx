import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

type AssignmentItemProps = {
  title: string,
  dueDate: string,
  dueTime: string,
}

export function AssignmentItem(props: AssignmentItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <Text style={styles.title}>{props.title}</Text>
        <FontAwesome name="edit" size={14} color="grey" />
      </View>
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

  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})