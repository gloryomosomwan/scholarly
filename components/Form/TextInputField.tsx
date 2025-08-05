import { useTheme } from "@/hooks";
import { SymbolView } from "expo-symbols";
import { StyleSheet, TextInput, View } from "react-native";

type TextInputFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void)
}

export default function TextInputField({ placeholder, value, onChangeText }: TextInputFieldProps) {
  const theme = useTheme()
  return (
    <View style={styles.detailRow}>
      <SymbolView name={'note.text'} tintColor={theme.grey500} size={24} />
      <TextInput
        placeholder={placeholder}
        style={[styles.detailText, { color: theme.text, flex: 1 }]}
        placeholderTextColor={theme.grey500}
        multiline
        returnKeyType='done'
        blurOnSubmit
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})