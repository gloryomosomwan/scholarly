import { StyleSheet } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

type ClearButtonProps = {
  onPress: () => void
}

export default function ClearButton({ onPress }: ClearButtonProps) {
  const theme = useTheme()
  return (
    <PressableOpacity style={[styles.container, { backgroundColor: theme.grey200 }]} onPress={onPress}>
      <SymbolView name='xmark' size={15} tintColor={theme.grey400} />
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15
  }
})