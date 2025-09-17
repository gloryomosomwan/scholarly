import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SymbolView } from 'expo-symbols'

import EventDetailsHeader from '@/components/EventDetailsScreen/EventDetailsHeader'
import EventDetailsDatetime from '@/components/EventDetailsScreen/EventDetailsDatetime'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'
import { getEventById } from '@/hooks/useDatabase'

export default function EventDetails() {
  const theme = useTheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  const convertedID = Number(id)
  const eventData = id ? getEventById(convertedID) : null
  console.log(eventData)
  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, {}]}>
        <PressableOpacity onPress={() => router.dismiss()}>
          <SymbolView name='xmark' tintColor={theme.text} />
        </PressableOpacity>
        <PressableOpacity onPress={() => router.navigate({ pathname: '/event-form', params: { id: id } })}>
          <SymbolView name='pencil' tintColor={theme.text} />
        </PressableOpacity>
      </View>
      <View style={[styles.detailContainer]}>
        <EventDetailsHeader event={eventData} />
        <EventDetailsDatetime start={eventData?.startDate} end={eventData?.endDate} />
        {
          eventData?.location &&
          <View style={styles.locationContainer}>
            <SymbolView name='mappin.circle.fill' size={20} tintColor={theme.grey400} style={{ width: 30 }} type='hierarchical' />
            <Text style={[styles.locationText, { color: theme.text }]}>{eventData?.location}</Text>
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  dateTimeText: {
    fontSize: 20,
  },
  detailContainer: {
    gap: 20
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  locationText: {
    fontSize: 15
  }
})