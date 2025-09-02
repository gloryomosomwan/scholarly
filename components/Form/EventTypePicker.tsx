import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import EventTypeModal from '@/components/Modals/EventTypeModal'

import { useTheme } from '@/hooks'
import { EventType } from '@/types'

type EventTypePickerProps = {
  eventType: EventType | null
  setEventType: React.Dispatch<React.SetStateAction<EventType | null>>
}

export default function EventTypePicker({ eventType, setEventType }: EventTypePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  const text = eventType?.replace(/\w/, c => c.toUpperCase())
  return (
    <View>
      <PressableOpacity onPress={handlePresentModal}>
        <View style={styles.row}>
          <SymbolView name={'tag'} tintColor={theme.grey500} size={24} />
          {eventType ?
            <View style={[styles.pill, { backgroundColor: theme.grey100 }]}>
              <Text style={[styles.eventTypeText, { color: theme.text }]}>{text}</Text>
            </View>
            :
            <Text style={[styles.placeholderText, { color: theme.grey500 }]}>Add event type</Text>
          }
        </View>
      </PressableOpacity>
      <EventTypeModal eventTypeSelectorModalRef={modalRef} setEventType={setEventType} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
})