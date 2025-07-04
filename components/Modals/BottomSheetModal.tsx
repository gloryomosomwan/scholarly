import React, { RefObject } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '@/components/PressableOpacity';

type BottomSheetModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
  children: React.ReactNode
  showHandle?: boolean
  showCloseButton?: boolean
  scrollable?: boolean
}
export default function CustomBottomSheetModal({ bottomSheetModalRef, children, showHandle = true, showCloseButton = true, scrollable = false }: BottomSheetModalProps) {
  const theme = useTheme()
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['45%']}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: theme.primary }}
      handleIndicatorStyle={{ display: showHandle ? 'flex' : 'none' }}
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
      <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
        {
          showCloseButton &&
          <PressableOpacity style={styles.closeButton} onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <SymbolView name={'xmark.circle.fill'} tintColor={theme.grey400} style={styles.closeButtonIcon} />
          </PressableOpacity>
        }
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