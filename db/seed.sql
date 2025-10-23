CREATE TABLE IF NOT EXISTS semesters (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    start TEXT NOT NULL, 
    end TEXT NOT NULL
);

INSERT INTO semesters (id, name, start, end) VALUES
(1, 'Summer 2025', '2025-07-04T06:00:00.000Z', '2025-08-21T06:00:00.000Z'),
(2, 'Spring 2025', '2025-05-07T06:00:00.000Z', '2025-06-23T06:00:00.000Z');

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    color TEXT NOT NULL,
    semester_id INTEGER NOT NULL,
    instructor TEXT,
    FOREIGN KEY (semester_id) REFERENCES semesters(id) 
);

INSERT INTO courses (id, name, code, color, semester_id, instructor) VALUES
(1, 'Social Media Marketing', 'MARK 203', '#007FFF', 1, 'Jeff Bernstein'),
(2, 'Build Systems', 'DEV 319', '#EF4444', 1, 'Dr. Linda Chou'),
(3, 'Introduction to Product Development', 'PROD 101', '#8B5CF6', 2, 'Bill Hawley');

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

INSERT INTO tasks (id, title, course_id, description, due, priority, completed_at, due_type) VALUES
(1, 'Research GitHub Actions', 1, 'Talk to Prof. Evans', '2025-08-29T06:00:00.000Z', 'high', NULL, 'date'),
(2, 'Learn about Hevy positioning', 2, 'Check their subreddit', '2025-08-20T06:00:00.000Z', 'medium', '2025-08-14T02:29:01.842Z', 'date'),
(3, 'Review lecture slides', NULL, 'Go through slides', '2025-08-30T06:00:00.000Z', 'low', NULL, 'date');

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

INSERT INTO assignments (id, title, course_id, description, due, due_type, completed_at, weight, grade) VALUES
(1, 'Assignment 2', 1, 'Check with jeff', '2025-08-29T06:00:00.000Z', 'date', NULL, 50, NULL);


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

INSERT INTO events (type, start_date, end_date, name, course_id, location, recurring) VALUES 
('general', '2025-08-20T12:00:00.000Z', '2025-08-20T13:00:00.000Z', 'Go to the gym', NULL, 'The Den', NULL),
('lecture', '2025-08-20T14:00:00.000Z', '2025-08-20T14:50:00.000Z', NULL, 1, 'ESB-4A', NULL),
('lecture', '2025-08-20T15:00:00.000Z', '2025-08-20T15:50:00.000Z', NULL, 2, 'JE-02', NULL),
('seminar', '2025-08-19T16:00:00.000Z', '2025-08-29T16:50:00.000Z', NULL, 1, 'ESB-9A', NULL);

create table IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    name TEXT NOT NULL,
    course_id INTEGER,
    location TEXT,
    notes TEXT,
    weight REAL,
    grade REAL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO tests (start, end) VALUES 
('2025-10-04T12:00:00.000Z', '2025-10-04T14:00:00.000Z');