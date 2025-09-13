import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import { RRule } from 'rrule'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'

type IntervalCounterProps = {
  rule: RRule
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
}

export default function IntervalCounter({ rule, setRecurring }: IntervalCounterProps) {
  const theme = useTheme()
  const interval = rule.options.interval

  const increase = () => {
    const newRule = new RRule({
      freq: rule.options.freq,
      dtstart: rule.options.dtstart,
      interval: rule.options.interval + 1,
      byweekday: rule.options.byweekday
    })
    setRecurring(newRule.toString())
  }

  const decrease = () => {
    const newRule = new RRule({
      freq: rule.options.freq,
      dtstart: rule.options.dtstart,
      interval: rule.options.interval - 1,
      byweekday: rule.options.byweekday
    })
    setRecurring(newRule.toString())
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.grey200 }]}>
      <Text style={[{ color: theme.text }]}>{`Every ${interval} days`}</Text>
      <View style={[styles.buttonContainer, { backgroundColor: theme.grey100 }]}>
        <PressableOpacity onPress={interval > 1 ? decrease : undefined} style={[styles.button, {}]}>
          <SymbolView name={'minus'} />
        </PressableOpacity>
        <PressableOpacity onPress={increase} style={[styles.button, {}]}>
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