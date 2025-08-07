import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import { courses, tasks } from './schema'

export const sqlite = openDatabaseSync('databaseName', { enableChangeListener: true })
export const db = drizzle(sqlite, { logger: true })
// db.select().from(courses).limit(1).then((d) => {
//   console.log(d)
// })