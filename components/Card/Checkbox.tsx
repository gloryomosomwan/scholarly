import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'

type CheckboxProps = {
  completed: string | undefined
  toggleCompleted: () => Promise<void>
}

export default function Checkbox({ completed, toggleCompleted }: CheckboxProps) {
  const theme = useTheme()
  return (
    <TouchableOpacity onPress={toggleCompleted} style={styles.container}>
      <SymbolView
        name={completed ? "checkmark.circle.fill" : "circle"}
        size={20}
        tintColor={completed ? theme.success : theme.grey400}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
})