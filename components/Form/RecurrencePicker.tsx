import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import { RRule } from 'rrule'

import { useTheme } from '@/hooks'

const weekdays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
}

export default function RecurrencePicker({ recurring, setRecurring }: RecurrencePickerProps) {
  const theme = useTheme()
  const rule = recurring ? RRule.fromString(recurring) : new RRule({ freq: RRule.WEEKLY, byweekday: [], })
  const byweekdayArray = rule.options.byweekday
  console.log(byweekdayArray)
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.text, { color: theme.grey500 }]}>Repeat</Text>
      </View>
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
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  item: {
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 20
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  }
})