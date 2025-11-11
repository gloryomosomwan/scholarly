import { StyleSheet, View } from 'react-native'
import React from 'react'

import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks/useTheme'

type IconProps = {
  eventType: string
}

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'lecture': return 'book';
    case 'lab': return 'flask';
    case 'office hours': return 'person.2';
    default: return 'calendar';
  }
};

export default function Icon({ eventType }: IconProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.grey200 }]}>
      <SymbolView name={getTypeIcon(eventType)} size={20} tintColor={theme.text} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})