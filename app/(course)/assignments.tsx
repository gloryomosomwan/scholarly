import { StyleSheet, Text, View } from 'react-native';

export default function Assignments() {
  return (
    <View style={styles.container}>
      <Text>Assignments</Text>
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
