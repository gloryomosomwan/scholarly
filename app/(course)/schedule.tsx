import { StyleSheet, Text, View } from 'react-native';

export default function Schedule() {
  return (
    <View style={styles.container}>
      <Text>Schedule</Text>
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
