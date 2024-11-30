import { StyleSheet, View, Text } from 'react-native'

type CourseCardProps = {
  courseName: string
}

export function CourseCard(props: CourseCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.courseName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    marginBottom: 10,
    padding: 13,
    borderRadius: 10
  },
  text: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center'
  }
})