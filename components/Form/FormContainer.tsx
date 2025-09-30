import { StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { useTheme } from '@/hooks/useTheme'

type FormContainerProps = {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  const theme = useTheme()
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ rotate: '0deg' }] }))
  return (
    <BottomSheetModalProvider>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
})