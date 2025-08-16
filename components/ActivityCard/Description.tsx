import { StyleSheet, Text } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'

type DescriptionProps = {
  description: string
}

export default function Description({ description }: DescriptionProps) {
  const theme = useTheme()
  return (
    <Text style={[styles.text, { color: theme.grey500 }]}>{description}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
})