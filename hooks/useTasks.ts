import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { like } from 'drizzle-orm';
import { tasks } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawActivity } from '@/utils/database';

export function useTasks() {
  const todayPattern = new Date().toISOString().slice(0, 10) + '%'; // timezone bug
  // const { data } = useLiveQuery(db.select().from(tasks).where(like(tasks.due, todayPattern)))
  const { data } = useLiveQuery(db.select().from(tasks))
  const activityData = data.map(convertRawActivity)
  return activityData
}