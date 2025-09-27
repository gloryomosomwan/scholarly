import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import PriorityModal from '@/components/Modals/PriorityModal'
import ClearButton from '@/components/Buttons/ClearButton'

import { usePriorityPalette, useTheme } from '@/hooks'
import { PriorityOption } from '@/types'

type PriorityPickerProps = {
  priority: PriorityOption | null
  setPriority: React.Dispatch<React.SetStateAction<PriorityOption | null>>
}

export default function PriorityPicker({ priority, setPriority }: PriorityPickerProps) {
  const theme = useTheme()
  const priorityPalette = usePriorityPalette(priority)
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View style={styles.container}>
      <PressableOpacity style={styles.button} onPress={handlePresentModal}>
        <SymbolView name={'flag'} tintColor={theme.grey500} size={24} />
        {priority ?
          <View style={[styles.tag, { backgroundColor: priorityPalette.backgroundColor }]}>
            <Text style={[styles.priorityText, { color: priorityPalette.color }]}>
              {priority.toUpperCase()}
            </Text>
          </View>
          :
          <Text style={[styles.text, { color: theme.grey500 }]}>Add priority</Text>
        }
      </PressableOpacity>
      {priority && <ClearButton onPress={() => setPriority(null)} />}
      <PriorityModal setPriority={setPriority} prioritySelectorModalRef={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  tag: {
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