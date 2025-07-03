import React, { RefObject, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { useTheme } from '@/utils/useTheme'
import PressableOpacity from '@/components/PressableOpacity';
import CourseItem from './CourseItem';

type CourseSelectorProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>
}

export default function CourseSelectorModal({ bottomSheetModalRef }: CourseSelectorProps) {
  const theme = useTheme()
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={[400]}
      enableDynamicSizing={false}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      )}
      backgroundStyle={{ backgroundColor: theme.primary }}
    >
      <BottomSheetView style={[styles.contentContainer, { backgroundColor: theme.primary }]}>
        <CourseItem code={'PHYS 102'} name={'Introduction to Physics'} color={'red'} />
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center'
  }
})