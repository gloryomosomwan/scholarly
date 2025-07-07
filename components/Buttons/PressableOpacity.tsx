import React, { ReactNode } from 'react';
import { Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';

interface PressableOpacityProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export default function PressableOpacity({ style, children, ...props }: PressableOpacityProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        style,
        { opacity: pressed ? 0.5 : 1.0 },
      ]}
    >
      {children}
    </Pressable>
  );
}
