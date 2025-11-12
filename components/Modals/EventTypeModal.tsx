import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import EventTypeModalItem from '@/components/Modals/ModalItems/EventTypeModalItem'

import { Event, EventType } from '@/types'

const eventTypes: EventType[] = ['lecture', 'lab', 'seminar']

type EventTypeModalProps = {
  eventTypeSelectorModalRef: React.RefObject<BottomSheetModal>
  courseID: string
  courseEvents: Event[]
}

export default function EventTypeModal({ eventTypeSelectorModalRef, courseID, courseEvents }: EventTypeModalProps) {
  const filtered = eventTypes.filter((eventType) => courseEvents.every((courseEvent) => courseEvent.type !== eventType))
  return (
    <CustomBottomSheetModal bottomSheetModalRef={eventTypeSelectorModalRef} scrollable>
      {filtered.map(eventType => (
        <EventTypeModalItem
          key={eventType}
          eventType={eventType}
          onSelect={() => {
            eventTypeSelectorModalRef.current?.dismiss()
            router.navigate({ pathname: '/event-form', params: { coursePageID: courseID, formType: 'course', eventType: eventType } })
          }}
        />
      ))}
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({})