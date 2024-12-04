import { StyleSheet, Text, View } from 'react-native';

export default function Exams() {
  return (
    <View style={styles.container}>
      <Text>Exams</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
