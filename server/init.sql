CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    songId TEXT NOT NULL,
    songName TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    score INTEGER DEFAULT -1
);
