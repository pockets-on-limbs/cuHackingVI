CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO songs (name) VALUES ('test');