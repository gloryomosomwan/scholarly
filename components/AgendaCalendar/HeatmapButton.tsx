import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'
import { useCalendarAppearanceStore } from '@/stores/calendar'

export default function HeatmapButton() {
  const { heatmapActive, toggleHeatmap } = useCalendarAppearanceStore()
  const theme = useTheme()
  const isGradientBackground = useColorScheme() === 'light'

  const handlePress = () => {
    toggleHeatmap()
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={({ pressed }) => [
        styles.button,
        { borderColor: theme.text, backgroundColor: heatmapActive ? theme.text : undefined },
        isGradientBackground && { borderColor: 'white', backgroundColor: heatmapActive ? 'white' : undefined },
        pressed && { opacity: 0.85 }
      ]}>
        <Text style={[
          styles.text, { color: heatmapActive ? theme.inverseText : theme.text },
          isGradientBackground && { color: heatmapActive ? 'black' : 'white' }
        ]}>{'H'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 25,
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