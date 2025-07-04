import React, { RefObject } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '@/components/PressableOpacity';
import { SymbolView } from 'expo-symbols';

type BottomSheetModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  children: React.ReactNode
}
export default function CustomBottomSheetModal({ bottomSheetModalRef, children }: BottomSheetModalProps) {
  const theme = useTheme()
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['45%']}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: theme.primary }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      )}
    >
      <PressableOpacity style={styles.closeButton} onPress={() => bottomSheetModalRef.current?.dismiss()}>
        <SymbolView name={'xmark.circle.fill'} tintColor={theme.grey400} style={styles.closeButtonIcon} />
      </PressableOpacity>
      <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    gap: 10
  },
  closeButton: {
    alignSelf: 'flex-end',
    right: 20,
    marginBottom: 15
  },
  closeButtonIcon: {},
})