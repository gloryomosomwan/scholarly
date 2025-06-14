import { StyleSheet, View, Text, ImageBackground } from "react-native"

import { useTheme } from "@/utils/useTheme"

type CardProps = {
  type: string,
  topLeft?: string,
  main: string,
  bottomLeft?: string,
  topRight?: string,
  bottomRight?: string
}

// const image = require('../assets/card-backgrounds/img.jpg')

export function Card(props: CardProps) {
  const theme = useTheme()

  return (
    <View style={[styles.container, styles.shadowProp, { backgroundColor: 'white' }]}>
      {/* <ImageBackground source={image} style={styles.image}> */}
      <View style={styles.firstRow}>
        <Text style={[styles.text]}>{props.topLeft}</Text>
        <Text style={[styles.text]}>{props.topRight}</Text>
      </View>
      <View style={styles.secondRow}>
        <Text style={[styles.text, props.type == 'event' ? styles.event : styles.task]}>{props.main}</Text>
        <Text style={[styles.text]}>{props.bottomRight}</Text>
      </View>
      <View>
        <Text style={[styles.text]}>{props.bottomLeft}</Text>
      </View>
      {/* </ ImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 6,
  },
  container: {
    marginBottom: 16,
    padding: 13,
    borderRadius: 10,
  },
  text: {
    color: "black"
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  event: {
    fontSize: 22,
    fontWeight: '600',
  },
  task: {
    fontSize: 19,
    fontWeight: '500'
  },
  // image: {
  //   /* @info Make the image fill the containing view */
  //   flex: 1,
  //   /* @info Scale up the image to fill the container, preserving aspect ratio */
  //   resizeMode: 'stretch',
  //   justifyContent: 'center',
  //   borderRadius: 10,
  // },
})