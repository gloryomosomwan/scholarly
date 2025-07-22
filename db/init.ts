import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'

export const sqlite = openDatabaseSync('databaseName', { enableChangeListener: true })
export const db = drizzle(sqlite, { logger: true })