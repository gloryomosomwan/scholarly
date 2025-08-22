import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type ButtonRowProps = {
  confirmDelete: () => void
  create: () => void
  update: () => void
  isCreateForm: boolean
  disabled: boolean
}

export default function ButtonRow({ create, confirmDelete, update, disabled, isCreateForm }: ButtonRowProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}>
      {
        isCreateForm === false &&
        <PressableOpacity onPress={confirmDelete}>
          <Text style={[styles.buttonText, { color: theme.dangerText }]}>Delete</Text>
        </PressableOpacity>
      }
      <PressableOpacity onPress={isCreateForm ? create : update} disabled={disabled}>
        <Text style={[styles.buttonText, { color: disabled ? theme.accentInactive : theme.accent }]}>Save</Text>
      </PressableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
})