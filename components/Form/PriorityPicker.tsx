import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { usePriorityPalette, useTheme } from '@/hooks'
import { SymbolView } from 'expo-symbols'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import { PriorityOption } from '@/types/types'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import PriorityModal from '../Modals/PriorityModal'

type PriorityPickerProps = {
  priority: PriorityOption | null
  setPriority: React.Dispatch<React.SetStateAction<PriorityOption | null>>
}

export default function PriorityPicker({ priority, setPriority }: PriorityPickerProps) {
  const theme = useTheme()
  const priorityPalette = usePriorityPalette(priority)
  const modalRef = useRef<BottomSheetModal>(null)
  return (
    <View>
      <PressableOpacity onPress={() => {
        Keyboard.dismiss()
        modalRef.current?.present()
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
      <PriorityModal setPriority={setPriority} prioritySelectorModalRef={modalRef} />
    </View>
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