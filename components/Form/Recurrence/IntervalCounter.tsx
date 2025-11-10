import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import { datetime, RRule } from 'rrule'

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

type IntervalCounterProps = {
  start: Date
  rule: RRule
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
}

const intervalMap = new Map([
  [RRule.DAILY, "day"],
  [RRule.WEEKLY, "week"],
  [RRule.MONTHLY, "month"],
]);

export default function IntervalCounter({ start, rule, setRecurring }: IntervalCounterProps) {
  const theme = useTheme()
  const interval = rule.options.interval
  const freq = rule.options.freq
  const intervalText = intervalMap.get(freq)
  let text;
  if (interval === 1) {
    text = `Every ${intervalText}`
  }
  else if (interval > 1) {
    text = `Every ${interval} ${intervalText}s`
  }
  function increase() {
    const dtstart = datetime(start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds())
    const newRule = new RRule({
      dtstart: dtstart,
      interval: rule.options.interval + 1,
      freq: rule.options.freq,
      until: rule.options.until,
      byweekday: rule.options.byweekday
    })
    setRecurring(newRule.toString())
  }
  function decrease() {
    const dtstart = datetime(start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds())
    const newRule = new RRule({
      dtstart: dtstart,
      interval: rule.options.interval - 1,
      freq: rule.options.freq,
      until: rule.options.until,
      byweekday: rule.options.byweekday
    })
    setRecurring(newRule.toString())
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.grey200 }]}>
      <Text style={[{ color: theme.text }]}>{text}</Text>
      <View style={[styles.buttonContainer, { backgroundColor: theme.grey100 }]}>
        <PressableOpacity onPress={rule.options.interval > 1 ? () => decrease() : undefined} style={[styles.button, {}]}>
          <SymbolView name={'minus'} />
        </PressableOpacity>
        <PressableOpacity onPress={() => increase()} style={[styles.button, {}]}>
          <SymbolView name={'plus'} />
        </PressableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10
  }
})