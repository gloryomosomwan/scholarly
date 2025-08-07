import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter, Href } from 'expo-router'
import { SymbolView } from 'expo-symbols'

import { useTheme } from '@/hooks'
import { getColorWithOpacity } from '@/utils'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

type AddButtonProps = {
  route: Href
  title: string
  description?: string
}

export default function AddButton({ route, title, description }: AddButtonProps) {
  const theme = useTheme()
  const router = useRouter()
  return (
    <View style={styles.addCourseContainer}>
      <PressableOpacity style={[styles.addCourseButtonContainer, { backgroundColor: theme.secondary, borderColor: theme.grey400 }]} onPress={() => { router.navigate(route) }}>
        <View style={styles.addCourseContentContainer}>
          <View style={[styles.addCourseIconContainer, { backgroundColor: getColorWithOpacity(theme.accent, 0.05) }]}>
            <SymbolView name="plus" size={20} tintColor={theme.accent} />
          </View>
          <View style={styles.addCourseTextContainer}>
            <Text style={[styles.addCourseText, { color: theme.text }]}>{title}</Text>
            {
              description && <Text style={[styles.addCourseSubtitleText, { color: theme.grey500 }]}>{description}</Text>
            }
          </View>
        </View>
      </PressableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addCourseContainer: {
    // paddingTop: 12,
    // paddingBottom: 16,
  },
  addCourseButtonContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  addCourseContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCourseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addCourseTextContainer: {
    flex: 1,
  },
  addCourseText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  addCourseSubtitleText: {
    fontSize: 14,
  },
})