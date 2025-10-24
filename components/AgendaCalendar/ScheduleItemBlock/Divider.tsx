import { DimensionValue, StyleSheet, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks/useTheme'

type DividerProps = {
  startDate: Date
  endDate: Date
  itemHasOccurred: boolean
  courseColor: string | undefined
}

export default function Divider({ itemHasOccurred, courseColor, startDate, endDate }: DividerProps) {
  const theme = useTheme()
  const itemStartMS = startDate.getTime()
  const itemEndMS = endDate.getTime()
  const isHappeningNow = (() => {
    if (Date.now() > itemStartMS && Date.now() < itemEndMS) {
      return true
    }
    return false
  })()
  const dynamicDividerHeightPct: DimensionValue = (() => {
    if (isHappeningNow) {
      let gap = itemEndMS - itemStartMS
      let soFar = Date.now() - itemStartMS
      let percentage = (soFar / gap) * 100
      return `${Math.floor(percentage)}%`
    }
    return '0%'
  })()
  return (
    <View style={styles.container}>
      <View style={[styles.staticDivider, { backgroundColor: itemHasOccurred ? theme.grey400 : courseColor }]} />
      <View style={[styles.dynamicDivider, { backgroundColor: theme.grey400, height: dynamicDividerHeightPct }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 3,
  },
  staticDivider: {
    height: '100%',
    width: 3,
    borderRadius: 90,
  },
  dynamicDivider: {
    width: 3,
    borderRadius: 90,
    position: 'absolute'
  },
})