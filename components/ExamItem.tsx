import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ExamItemProps = {
  title: string,
  day: string,
  time: string,
  location: string
}

export function ExamItem(props: ExamItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <Text style={styles.title}>{props.title}</Text>
        <FontAwesome name="edit" size={14} color="grey" />
      </View>
      <Text style={[styles.text, styles.day]}>{props.day}</Text>
      <Text style={[styles.text, styles.time]}>{props.time}</Text>
      <Text style={[styles.text, styles.location]}>{props.location}</Text>
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
  day: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 3
  },
  time: {

  },
  location: {

  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})