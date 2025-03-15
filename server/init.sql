CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    songid TEXT NOT NULL,
    songname TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    score INTEGER DEFAULT -1
);
