import { StyleSheet, View, Text } from "react-native"
import { SFSymbol, SymbolView } from 'expo-symbols';

import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

import { useTheme } from '@/utils/useTheme';
import { courseColors } from '@/utils/Calendar/data';

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
  const now = dayjs()
  const isHappening = now.isBetween(event.start, event.end)
  const timeToNowString = dayjs(event.start).toNow()
  const capitalizedTimeToNowString = timeToNowString.charAt(0).toUpperCase() + timeToNowString.slice(1)
  const courseColor = courseColors[event.course as keyof typeof courseColors];

  return (
    <View style={[styles.container, styles.shadowProp, { backgroundColor: 'white' }]}>
      <View style={styles.leftColumnContainer}>
        <Text style={[styles.text]}>{event.type}</Text>
        <View style={styles.courseContainer}>
          <SymbolView name={event.icon} size={35} style={styles.icon} tintColor={courseColor} />
          <Text style={[styles.course]}>{event.course}</Text>
        </View>
      </View>
      <View style={styles.rightColumnContainer}>
        <Text style={[styles.text]}>{`${event.start.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })} - ${event.end.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}`}</Text>
        {!isHappening &&
          <Text style={[styles.text]}>{capitalizedTimeToNowString}</Text>
        }
        <View style={styles.locationContainer}>
          <SymbolView name="mappin.circle.fill" style={styles.locationIcon} size={12} tintColor={theme.tertiary} />
          <Text style={[styles.text]}>{event.location}</Text>
        </View>
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
    height: 86,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: "black",
    fontSize: 15
  },
  leftColumnContainer: {
  },
  rightColumnContainer: {
    alignItems: 'flex-end'
  },
  task: {
    fontSize: 19,
    fontWeight: '500'
  },
  course: {
    fontSize: 33,
    fontWeight: '500'
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 4,
  },
  locationIcon: {
    marginRight: 3,
    opacity: 0.6
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})