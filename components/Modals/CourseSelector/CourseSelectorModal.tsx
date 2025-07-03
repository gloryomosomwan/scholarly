import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '@/components/PressableOpacity';
import CourseItem from './CourseItem';
import { SymbolView } from 'expo-symbols';

type CourseSelectorProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
}

export default function CourseSelectorModal({ bottomSheetModalRef }: CourseSelectorProps) {
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
      <BottomSheetScrollView contentContainerStyle={[styles.contentContainer, { backgroundColor: theme.primary }]}>
        <CourseItem code={'PHYS 102'} name={'Introduction to Physics'} color={'red'} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    right: 20,
    marginBottom: 15
  },
  closeButtonIcon: {},
})