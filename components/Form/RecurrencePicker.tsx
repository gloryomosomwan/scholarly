import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SymbolView } from 'expo-symbols'
import { RRule } from 'rrule'

import RecFreqPicker from '@/components/Form/Recurrence/RecFreqPicker'

import { useTheme } from '@/hooks'
import { Frequency } from '@/types'

const weekdays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
}

export default function RecurrencePicker({ recurring, setRecurring }: RecurrencePickerProps) {
  const theme = useTheme()
  const [frequency, setFrequency] = useState<Frequency>('once')
  const rule = recurring ? RRule.fromString(recurring) : new RRule({ freq: RRule.WEEKLY, byweekday: [], })
  const byweekdayArray = rule.options.byweekday
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>Repeat</Text>
      </View>
      <RecFreqPicker frequency={frequency} setFrequency={setFrequency} />
      <View style={[styles.dayContainer]}>
        {weekdays.map(function (day, index) {
          return (
            <Pressable
              key={index}
              onPress={() => {
                if (byweekdayArray && byweekdayArray.includes(day.weekday)) {
                  const index = byweekdayArray.indexOf(day.weekday)
                  const newArr = byweekdayArray.toSpliced(index, 1)
                  const newRule = new RRule({
                    freq: rule.options.freq,
                    byweekday: newArr
                  })
                  setRecurring(newArr.length === 0 ? null : newRule.toString())
                }
                else if (byweekdayArray) {
                  const newRule = new RRule({
                    freq: rule.options.freq,
                    byweekday: [...byweekdayArray, day.weekday]
                  })
                  setRecurring(newRule.toString())
                }
                else {
                  const newRule = new RRule({
                    freq: rule.options.freq,
                    byweekday: [day.weekday]
                  })
                  setRecurring(newRule.toString())
                }
              }}
              style={[
                byweekdayArray && byweekdayArray.includes(day.weekday) && { backgroundColor: theme.grey600 },
                styles.item,
                { borderColor: theme.grey400 },
              ]}
            >
              <Text style={[styles.dayText, { color: theme.grey400 }]}>{day.toString()}</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    gap: 16,
  },
  fieldText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
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