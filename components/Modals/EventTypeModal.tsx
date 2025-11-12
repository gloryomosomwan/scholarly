import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'

import { EventType } from '@/types'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import EventTypeModalItem from '@/components/Modals/ModalItems/EventTypeModalItem'

type EventTypeModalProps = {
  eventTypeSelectorModalRef: React.RefObject<BottomSheetModal>
  courseID: string
  events: EventType[]
}

export default function EventTypeModal({ eventTypeSelectorModalRef, courseID, events }: EventTypeModalProps) {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={eventTypeSelectorModalRef} scrollable>
      {events.map(eventType => (
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