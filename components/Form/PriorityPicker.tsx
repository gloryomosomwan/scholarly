import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { usePriorityPalette, useTheme } from '@/hooks'
import { SymbolView } from 'expo-symbols'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import { PriorityOption } from '@/types/types'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type PriorityPickerProps = {
  priority: PriorityOption | null
  prioritySelectorModalRef: React.RefObject<BottomSheetModal>
}

export default function PriorityPicker({ priority, prioritySelectorModalRef }: PriorityPickerProps) {
  const theme = useTheme()
  const priorityPalette = usePriorityPalette(priority)
  return (
    <PressableOpacity onPress={() => {
      Keyboard.dismiss()
      prioritySelectorModalRef.current?.present()
    }}>
      <View style={styles.detailRow}>
        <SymbolView name={'flag'} tintColor={theme.grey500} size={24} />
        {priority ?
          (() => {
            return (
              <View style={[styles.priorityTag, { backgroundColor: priorityPalette.backgroundColor }]}>
                <Text style={[styles.priorityText, { color: priorityPalette.color }]}>
                  {priority.toUpperCase()}
                </Text>
              </View>
            )
          })()
          :
          <Text style={[styles.detailText, { color: theme.grey500 }]}>Add priority</Text>
        }
      </View>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  priorityTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    // borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
})