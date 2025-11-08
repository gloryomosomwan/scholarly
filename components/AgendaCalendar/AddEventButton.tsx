import { StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import React from 'react'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'

type AddEventButtonProps = {

}

export default function AddEventButton({ }: AddEventButtonProps) {
  const theme = useTheme()
  return (
    <PressableOpacity style={styles.container} onPress={() => router.navigate({ pathname: '/event-form', params: { formType: 'general' } })} testID='add task button'>
      <SymbolView name='plus' />
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 65,
    height: '100%',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 1.55,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  text: {
    fontWeight: '600'
  },
})