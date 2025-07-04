import React, { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';
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
  const Container = scrollable ? BottomSheetScrollView : BottomSheetView;

  const handleComponent = () => {
    return (
      <View style={[styles.handle, {}]}>
        {showHandle && <View style={[styles.handleIndicator, { backgroundColor: theme.grey400 }]} />}
        {showCloseButton && (
          <PressableOpacity style={styles.closeButton} onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <SymbolView name={'xmark.circle.fill'} tintColor={theme.grey400} style={styles.closeButtonIcon} />
          </PressableOpacity>
        )}
      </View>
    )
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['45%']}
      enableDynamicSizing={false}
      backgroundStyle={{ backgroundColor: theme.primary }}
      handleIndicatorStyle={{ display: showHandle ? 'flex' : 'none' }}
      handleComponent={handleComponent}
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
      <Container>
        <View style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
          {children}
        </View>
      </Container>
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
    marginBottom: 15,
  },
  closeButtonIcon: {},
  handle: {
    paddingTop: 15
  },
  handleIndicator: {
    width: 50,
    height: 5,
    borderRadius: 10,
    alignSelf: 'center'
  },
})