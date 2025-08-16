import { StyleSheet, Text } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'

type TitleProps = {
  completed: string | undefined
  title: string
}

export default function Title({ title, completed }: TitleProps) {
  const theme = useTheme()
  return (
    <Text style={[styles.title, { color: theme.text }, completed && [styles.completed, { color: theme.grey500 }]]}>
      {title}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginRight: 12,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
})