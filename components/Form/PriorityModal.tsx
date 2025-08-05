import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PriorityOption } from '@/types/types'
import CustomBottomSheetModal from '../Modals/BottomSheetModal'
import PriorityItem from '../Modals/Items/PriorityItem'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

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