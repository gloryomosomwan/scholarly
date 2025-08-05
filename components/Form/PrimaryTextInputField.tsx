import { useTheme } from "@/hooks";
import { StyleSheet, TextInput } from "react-native";

type PrimaryTextInputFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void)
}

export default function PrimaryTextInputField({ placeholder, value, onChangeText }: PrimaryTextInputFieldProps) {
  const theme = useTheme()
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.text, { color: theme.text }]}
      placeholderTextColor={theme.grey500}
      returnKeyType='done'
      multiline
      blurOnSubmit
      value={value}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 8,
  },
})