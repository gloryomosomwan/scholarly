
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function CoursePage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DEV 100</Text>
        <FontAwesome size={28} name="cog" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8faf9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 26,
    fontWeight: '600'
  }
});