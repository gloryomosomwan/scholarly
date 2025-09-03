import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import EventTypeModalItem from '@/components/Modals/Items/EventTypeModalItem'

import { EventType } from '@/types'

const eventTypes: EventType[] = ['lecture', 'lab', 'seminar', 'general']

type EventTypeModalProps = {
  eventTypeSelectorModalRef: React.RefObject<BottomSheetModal>
  setEventType: React.Dispatch<React.SetStateAction<EventType | null>>
}

export default function EventTypeModal({ eventTypeSelectorModalRef, setEventType }: EventTypeModalProps) {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={eventTypeSelectorModalRef} scrollable>
      {eventTypes.map(eventType => (
        <EventTypeModalItem
          key={eventType}
          eventType={eventType}
          onSelect={() => {
            setEventType(eventType)
            eventTypeSelectorModalRef.current?.dismiss()
          }}
        />
      ))}
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({})