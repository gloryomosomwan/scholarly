import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import PriorityModalItem from '@/components/Modals/Items/PriorityModalItem'

import { PriorityOption } from '@/types'

type PriorityModalProps = {
  setPriority: (value: React.SetStateAction<PriorityOption | null>) => void
  prioritySelectorModalRef: React.RefObject<BottomSheetModal>
}

export default function PriorityModal({ setPriority, prioritySelectorModalRef }: PriorityModalProps) {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={prioritySelectorModalRef} showHandle={false}>
      <PriorityModalItem level={'high'} onSelect={() => {
        setPriority('high')
        prioritySelectorModalRef.current?.dismiss()
      }} />
      <PriorityModalItem level={'medium'} onSelect={() => {
        setPriority('medium')
        prioritySelectorModalRef.current?.dismiss()
      }} />
      <PriorityModalItem level={'low'} onSelect={() => {
        setPriority('low')
        prioritySelectorModalRef.current?.dismiss()
      }} />
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({})