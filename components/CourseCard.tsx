import { StyleSheet, View } from 'react-native'
import { Link, RelativePathString } from 'expo-router'


type CourseCardProps = {
  courseName: string,
  page: RelativePathString
}

export function CourseCard(props: CourseCardProps) {

  const handlePress = () => {
  }

  return (
    <View style={styles.container}>
      <Link onPress={handlePress} href={{ pathname: props.page, params: { name: props.courseName } }} style={styles.text}>{props.courseName}</Link>
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