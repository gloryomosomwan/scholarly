import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import { useTheme } from '@/hooks'
import { courses } from '@/data/data'

type ColorPickerProps = {
  selectedColor: string | null
  setSelectedColor: (value: React.SetStateAction<string | null>) => void
}

export default function ColorPicker({ selectedColor, setSelectedColor }: ColorPickerProps) {
  const theme = useTheme()
  const courseColors = courses.map(course => course.color);
  return (
    <View style={[styles.colorPickerField, { flexDirection: 'column' }]}>
      <View style={[styles.fieldContainer]}>
        <SymbolView name={'paintpalette'} tintColor={theme.grey500} />
        <Text style={[styles.detailText, { color: theme.grey500 }]}>Choose color</Text>
      </View>
      <View style={styles.colorPickerContainer}>
        {courseColors.map((color, index) => (
          <Pressable
            key={index}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorCircle,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    alignSelf: 'center'
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorCircle: {
    borderColor: 'black',
  },
  colorPickerField: {
    gap: 8
  },
  fieldContainer: {
    flexDirection: 'row',
    gap: 16
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})