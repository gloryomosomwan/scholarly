import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'

export const sqlite = openDatabaseSync('test-DB', { enableChangeListener: true })

sqlite.execSync(`
CREATE TABLE IF NOT EXISTS semesters (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    start TEXT NOT NULL, 
    end TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    color TEXT NOT NULL,
    semester_id INTEGER NOT NULL,
    instructor TEXT,
    FOREIGN KEY (semester_id) REFERENCES semesters(id) 
);
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    course_id INTEGER,
    description TEXT,
    due TEXT, 
    priority TEXT,
    completed_at TEXT,
    due_type TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
create table IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    course_id INTEGER NOT NULL,
    description TEXT,
    due TEXT NOT NULL, 
    due_type TEXT NOT NULL,
    completed_at TEXT,
    weight REAL,
    grade REAL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
create table IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    name TEXT,
    course_id INTEGER,
    location TEXT,
    recurring TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
  `)

export const db = drizzle(sqlite, { logger: false })