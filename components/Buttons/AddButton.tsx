import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SFSymbol, SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import { getColorWithOpacity } from '@/utils'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

type AddButtonProps = {
  handlePress: () => void
  title: string
  description?: string
  icon?: SFSymbol
}

export default function AddButton({ handlePress, title, description, icon = 'plus' }: AddButtonProps) {
  const theme = useTheme()
  return (
    <PressableOpacity style={[styles.container, { backgroundColor: theme.secondary, borderColor: theme.grey400 }]} onPress={handlePress}>
      <View style={styles.contentContainer}>
        <View style={[styles.iconContainer, { backgroundColor: getColorWithOpacity(theme.accent, 0.05) }]}>
          <SymbolView name={icon} size={20} tintColor={theme.accent} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: theme.text }]}>{title}</Text>
          {description && <Text style={[styles.descriptionText, { color: theme.grey500 }]}>{description}</Text>}
        </View>
      </View>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 14,
  },
})