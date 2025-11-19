import { StyleSheet, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'
import { Test } from '@/types'

import UpcomingDateItem from '@/components/Dashboard/UpcomingDateItem'

type UpcomingDateCardProps = {
  items: Test[]
}

export default function UpcomingDateCard({ items }: UpcomingDateCardProps) {
  const theme = useTheme()
  const upcomingItems = items.map((item) => {
    const key = `${item.id}.${item.startDate}.${item.type}`
    return <UpcomingDateItem item={item} key={key} />
  })
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
      {upcomingItems}
    </View>)
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderWidth: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  }
})