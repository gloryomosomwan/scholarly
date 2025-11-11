import { StyleSheet, Text } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type PrimaryTextProps = {
  text: string
}

export default function PrimaryText({ text }: PrimaryTextProps) {
  const theme = useTheme()
  const dtext = text?.replace(/\w/, c => c.toUpperCase())
  return (
    <Text style={[styles.text, { color: theme.text }]}>{dtext}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '600'
  }
})