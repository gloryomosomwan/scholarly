import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '@/hooks'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { courses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/db/init'

type SubheaderProps = {
  id: string
}

export default function Subheader({ id }: SubheaderProps) {
  const theme = useTheme()
  let converted = Number(id)
  const { data } = useLiveQuery(db.select().from(courses).where(eq(courses.id, converted)))
  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <Text style={[styles.courseNameText, { color: theme.grey600 }]}>{data[0]?.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 15,
    justifyContent: 'space-between'
  },
  courseNameText: {
    fontSize: 20,
    fontWeight: '600',
    left: 20,
  },
  statRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    left: 20,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statValueText: {
    fontSize: 11,
    fontWeight: '600'
  },
  statLabelText: {
    fontSize: 11,
    fontWeight: '500'
  },
})