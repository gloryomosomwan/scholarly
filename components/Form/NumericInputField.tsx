import { useTheme } from "@/hooks";
import { SFSymbol, SymbolView } from "expo-symbols";
import { StyleSheet, TextInput, View, Text } from "react-native";

type NumericInputFieldProps = {
  icon?: SFSymbol
  placeholder: string;
  value: string | null;
  onChangeText: ((text: string) => void);
  invalid: boolean;
}

export default function NumericInputField({ icon, placeholder, value, onChangeText, invalid }: NumericInputFieldProps) {
  const theme = useTheme()
  return (
    <View style={styles.row}>
      <SymbolView name={icon ? icon : 'note.text'} tintColor={theme.grey500} size={24} />
      <TextInput
        placeholder={placeholder}
        style={[styles.text, { color: invalid ? 'red' : theme.text, flex: 1 }]}
        placeholderTextColor={theme.grey500}
        multiline
        returnKeyType='done'
        blurOnSubmit
        value={value ? value : ''}
        onChangeText={onChangeText}
        keyboardType='decimal-pad'
        maxLength={4}
      />
      <SymbolView name={'percent'} tintColor={theme.grey500} size={24} />
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