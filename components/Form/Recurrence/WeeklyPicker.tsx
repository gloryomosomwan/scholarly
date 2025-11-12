import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RRule } from 'rrule'

import { useTheme } from '@/hooks/useTheme'
import { findDay } from '@/utils/scheduleItem'

const weekdays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

type WeeklyPickerProps = {
  rule: RRule
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
  start: Date
}

export default function WeeklyPicker({ rule, setRecurring, start }: WeeklyPickerProps) {
  const theme = useTheme()
  const byweekdayArray = rule.options.byweekday
  return (
    <View style={[styles.dayContainer]}>
      {weekdays.map(function (day, index) {
        const locked = day.weekday === findDay(start)?.weekday
        return (
          <Pressable
            key={index}
            disabled={locked}
            onPress={() => {
              // If this weekday is already in the array, remove it
              if (byweekdayArray && byweekdayArray.includes(day.weekday)) {
                const index = byweekdayArray.indexOf(day.weekday)
                const newArr = byweekdayArray.toSpliced(index, 1)
                const newRule = new RRule({
                  freq: rule.options.freq,
                  dtstart: rule.options.dtstart,
                  interval: rule.options.interval,
                  byweekday: newArr,
                  until: rule.options.until
                })
                setRecurring(newArr.length === 0 ? null : newRule.toString())
              }
              // If there is already an array (other weekdays are there), add this weekday
              else if (byweekdayArray) {
                const newRule = new RRule({
                  freq: rule.options.freq,
                  dtstart: rule.options.dtstart,
                  interval: rule.options.interval,
                  byweekday: [...byweekdayArray, day.weekday],
                  until: rule.options.until
                })
                setRecurring(newRule.toString())
              }
              // If there isn't already an array, start one with this weekday
              else {
                const newRule = new RRule({
                  freq: RRule.WEEKLY,
                  dtstart: rule.options.dtstart,
                  interval: rule.options.interval,
                  byweekday: [day.weekday],
                  until: rule.options.until
                })
                setRecurring(newRule.toString())
              }
            }}
            style={[
              byweekdayArray && byweekdayArray.includes(day.weekday) && { backgroundColor: theme.grey600 },
              locked && { opacity: 0.5 },
              styles.item,
              { borderColor: theme.grey400 },
            ]}
          >
            <Text style={[styles.dayText, { color: theme.grey400 }]}>{day.toString()}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1.5,
    padding: 4,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 20,
    fontWeight: '400'
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  }
})