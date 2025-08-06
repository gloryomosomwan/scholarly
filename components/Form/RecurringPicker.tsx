import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import PressableOpacity from '../Buttons/PressableOpacity'
import { useTheme } from '@/hooks'

export default function RecurringPicker() {
  const theme = useTheme()
  const router = useRouter()
  return (
    <View style={[styles.container, { justifyContent: 'space-between' }]}>
      <PressableOpacity onPress={() => router.push('/recurrence-modal')}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
          <Text style={[styles.text, { color: theme.grey500 }]}>Repeat</Text>
        </View>
      </PressableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})