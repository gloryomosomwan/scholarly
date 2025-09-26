import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

type IntervalCounterProps = {
  interval: number
  setInterval: React.Dispatch<React.SetStateAction<number>>
}

export default function IntervalCounter({ interval, setInterval }: IntervalCounterProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.grey200 }]}>
      <Text style={[{ color: theme.text }]}>{`Every ${interval} days`}</Text>
      <View style={[styles.buttonContainer, { backgroundColor: theme.grey100 }]}>
        <PressableOpacity onPress={interval > 1 ? () => setInterval(interval - 1) : undefined} style={[styles.button, {}]}>
          <SymbolView name={'minus'} />
        </PressableOpacity>
        <PressableOpacity onPress={() => setInterval(interval + 1)} style={[styles.button, {}]}>
          <SymbolView name={'plus'} />
        </PressableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10
  }
})