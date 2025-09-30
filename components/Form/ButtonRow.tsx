import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'

type ButtonRowProps = {
  confirmDelete: () => void
  create: () => void
  update: () => void
  isCreateForm: boolean
  disabled: boolean
}

export default function ButtonRow({ create, confirmDelete, update, disabled, isCreateForm }: ButtonRowProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container]}>
      {
        isCreateForm === false &&
        <PressableOpacity onPress={confirmDelete}>
          <Text style={[styles.text, { color: theme.dangerText }]}>Delete</Text>
        </PressableOpacity>
      }
      <PressableOpacity onPress={isCreateForm ? create : update} disabled={disabled}>
        <Text style={[styles.text, { color: disabled ? theme.accentInactive : theme.accent }]}>Save</Text>
      </PressableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
})