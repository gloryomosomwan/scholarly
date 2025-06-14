import { StyleSheet, View, Text } from "react-native"
import { SFSymbol } from 'expo-symbols';

import { useTheme } from "@/utils/useTheme"

type EventCardProps = {
  event: {
    type: string
    course: string
    icon: SFSymbol
    location: string
    start: Date
    end: Date
  }
}

export function EventCard({ event }: EventCardProps) {
  const theme = useTheme()

  return (
    <View style={[styles.container, styles.shadowProp, { backgroundColor: 'white' }]}>
      <View style={styles.topRow}>
        <Text style={[styles.text]}>{event.type}</Text>
        <Text style={[styles.text]}>{event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}</Text>
      </View>
      <View style={styles.secondRow}>
        <Text style={[styles.course]}>{event.course}</Text>
        {/* <Text style={[styles.text]}>{event.bottomRight}</Text> */}
      </View>
      <View>
        <Text style={[styles.text]}>{event.location}</Text>
      </View>
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
  topRow: {
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
  course: {
    fontSize: 22,
    fontWeight: '600'
  }
})