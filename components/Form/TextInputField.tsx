import { useTheme } from "@/hooks";
import { SFSymbol, SymbolView } from "expo-symbols";
import { StyleSheet, TextInput, View } from "react-native";

type TextInputFieldProps = {
  icon?: SFSymbol
  placeholder: string;
  value: string | null;
  onChangeText: ((text: string) => void)
}

export default function TextInputField({ icon, placeholder, value, onChangeText }: TextInputFieldProps) {
  const theme = useTheme()
  return (
    <View style={styles.row}>
      <SymbolView name={icon ? icon : 'note.text'} tintColor={theme.grey500} size={24} />
      <TextInput
        placeholder={placeholder}
        style={[styles.text, { color: theme.text, flex: 1 }]}
        placeholderTextColor={theme.grey500}
        multiline
        returnKeyType='done'
        blurOnSubmit
        value={value ? value : ''}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})