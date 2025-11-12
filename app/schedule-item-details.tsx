import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SymbolView } from 'expo-symbols'

import Header from '@/components/ScheduleItemDetails/Header'
import Datetime from '@/components/ScheduleItemDetails/Datetime'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'
import { useEventById, useTestById } from '@/hooks/useDatabase'

export default function ScheduleItemDetails() {
  const theme = useTheme()
  const { id, itemType } = useLocalSearchParams<{ id: string, itemType: string }>()
  const convertedID = Number(id)
  const itemData = id ? (itemType === 'event' ? useEventById(convertedID) : useTestById(convertedID)) : null
  const pathname = itemType === 'event' ? '/event-form' : '/test-form'
  const formType = (itemData?.type === 'lecture' || itemData?.type === 'lab' || itemData?.type === 'seminar') ? 'course' : 'general'
  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, {}]}>
        <PressableOpacity onPress={() => router.dismiss()}>
          <SymbolView name='xmark' tintColor={theme.text} />
        </PressableOpacity>
        <PressableOpacity onPress={() => router.navigate({ pathname: pathname, params: { id: id, formType: formType, eventType: itemData?.type } })}>
          <SymbolView name='pencil' tintColor={theme.text} />
        </PressableOpacity>
      </View>
      <View style={[styles.detailContainer]}>
        <Header item={itemData} />
        <Datetime start={itemData?.startDate} end={itemData?.endDate} />
        {
          itemData?.location &&
          <View style={styles.locationContainer}>
            <SymbolView name='mappin.circle.fill' size={20} tintColor={theme.grey400} style={{ width: 30 }} type='hierarchical' />
            <Text style={[styles.locationText, { color: theme.text }]}>{itemData?.location}</Text>
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