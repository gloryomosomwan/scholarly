import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type HeaderProps = {
  itemHasOccurred: boolean
  hasCourse: boolean
  type: string
  title: string | undefined
  courseColor: string | undefined
  isCourseEvent: boolean
}

export default function Header({ itemHasOccurred, hasCourse, type, title, courseColor, isCourseEvent }: HeaderProps) {
  const theme = useTheme()
  let text;
  if (isCourseEvent) text = type.replace(/\w/, c => c.toUpperCase())
  else text = title || '(No title)'
  const testStyle: TextStyle = { fontWeight: '500', color: itemHasOccurred ? theme.grey400 : courseColor }
  return (
    <View style={styles.container}>
      {hasCourse && <Text style={styles.icon}>{'📚'}</Text>}
      <Text style={[styles.text, { color: itemHasOccurred ? theme.grey400 : theme.text }, type === 'test' && testStyle]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 21,
  },
})