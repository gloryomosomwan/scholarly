import { StyleSheet } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import CustomBottomSheetModal from '@/components/Modals/BottomSheetModal'
import PriorityItem from '@/components/Modals/Items/PriorityItem'

import { PriorityOption } from '@/types'

type PriorityModalProps = {
  setPriority: (value: React.SetStateAction<PriorityOption | null>) => void
  prioritySelectorModalRef: React.RefObject<BottomSheetModal>
}

export default function PriorityModal({ setPriority, prioritySelectorModalRef }: PriorityModalProps) {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={prioritySelectorModalRef} showHandle={false}>
      <PriorityItem level={'high'} onSelect={() => {
        setPriority('high')
        prioritySelectorModalRef.current?.dismiss()
      }} />
      <PriorityItem level={'medium'} onSelect={() => {
        setPriority('medium')
        prioritySelectorModalRef.current?.dismiss()
      }} />
      <PriorityItem level={'low'} onSelect={() => {
        setPriority('low')
        prioritySelectorModalRef.current?.dismiss()
      }} />
    </CustomBottomSheetModal>
  )
}

const styles = StyleSheet.create({})