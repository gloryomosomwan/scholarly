import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableOpacity from '../Buttons/PressableOpacity'
import { useTheme } from '@/hooks'

type ButtonRowProps = {
  delete1: () => void
  create: () => void
  update: () => void
  id: string
  field: string
}

export default function ButtonRow({ id, field, create, delete1, update }: ButtonRowProps) {
  const theme = useTheme()
  return (
    <View style={[styles.buttonContainer, {}]}>
      {
        id !== undefined &&
        <PressableOpacity onPress={delete1}>
          <Text style={[styles.buttonText, { color: theme.dangerText }]}>Delete</Text>
        </PressableOpacity>
      }
      <PressableOpacity onPress={id !== undefined ? update : create} disabled={field.length > 0 ? false : true}>
        <Text style={[styles.buttonText, { color: field.length > 0 ? theme.accent : theme.accentInactive }]}>Save</Text>
      </PressableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
})