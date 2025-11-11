import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import EventTypeModalItem from '@/components/Modals/ModalItems/EventTypeModalItem'

import { EventType } from '@/types'

const eventTypes: EventType[] = ['lecture', 'lab', 'seminar']

type EventTypeModalProps = {
  eventTypeSelectorModalRef: React.RefObject<BottomSheetModal>
  courseID: string
}

export default function EventTypeModal({ eventTypeSelectorModalRef, courseID }: EventTypeModalProps) {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={eventTypeSelectorModalRef} scrollable>
      {eventTypes.map(eventType => (
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