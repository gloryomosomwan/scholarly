import React, { RefObject } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTheme } from '@/utils/useTheme'

type DateTimeModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  handleSheetChanges: (index: number) => void
}

export default function DateTimeModal({ bottomSheetModalRef, handleSheetChanges }: DateTimeModalProps) {
  const theme = useTheme()
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})