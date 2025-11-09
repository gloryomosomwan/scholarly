import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { datetime, Frequency, RRule } from 'rrule'
import { getDay } from 'date-fns'

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

const frequencies: (Frequency | undefined)[] = [undefined, RRule.DAILY, RRule.WEEKLY, RRule.MONTHLY]

type RecFreqPickerProps = {
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
  rule: RRule
  recurring: string | null
  startDate: Date
}

export default function RecFreqPicker({ rule, startDate, setRecurring, recurring }: RecFreqPickerProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, { borderColor: theme.accent }]} >
      {frequencies.map(function (value, index) {
        const text = value === undefined ? 'Once' : textMap[value]
        return (
          <PressableOpacity
            key={index}
            style={[styles.item, (rule.options.freq === value || (value === undefined && recurring === null)) && { backgroundColor: theme.accent }]}
            onPress={() => {
              if (value === undefined) {
                setRecurring(null)
              }
              else {
                const dtstart = datetime(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds())
                const byweekday = rule.options.byweekday
                const newRule = new RRule({
                  dtstart: dtstart,
                  interval: rule.options.interval,
                  freq: value,
                  until: rule.options.until,
                  byweekday: value === RRule.WEEKLY ? (byweekday || getDay(startDate) - 1) : null
                })
                setRecurring(newRule.toString())
              }
            }}
          >
            <Text style={[styles.itemText, { color: (rule.options.freq === value || (value === undefined && recurring === null)) ? theme.primary : theme.accent }]}>{text}</Text>
          </PressableOpacity>
        )
      })}
    </View>
  )
}

const textMap: Partial<Record<Frequency, string>> = {
  3: 'Daily',
  2: 'Weekly',
  1: 'Monthly'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 5,
  },
  item: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    fontWeight: '500',
    fontSize: 16,
  },
})