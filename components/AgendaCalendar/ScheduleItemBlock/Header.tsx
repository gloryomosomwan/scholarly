import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type HeaderProps = {
  itemHasOccurred: boolean
  hasCourse: boolean
  itemType: string
  itemName: string | undefined
  courseColor: string | undefined
}

export default function Header({ itemHasOccurred, hasCourse, itemType, itemName, courseColor }: HeaderProps) {
  const theme = useTheme()
  let text;
  if (itemType !== 'general' && itemType !== 'test') {
    text = itemType?.replace(/\w/, c => c.toUpperCase())
  }
  else {
    text = itemName
  }
  const testStyle: TextStyle = { fontWeight: '500', color: itemHasOccurred ? theme.grey400 : courseColor }
  return (
    <View style={styles.container}>
      {hasCourse && <Text style={styles.icon}>{'📚'}</Text>}
      <Text style={[styles.text, { color: itemHasOccurred ? theme.grey400 : theme.text }, itemType === 'test' && testStyle]}>{text}</Text>
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