import Database from "better-sqlite3";

const db = new Database("game.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS game_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id TEXT NOT NULL,
    genre TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    song TEXT NOT NULL,
    guesses TEXT NOT NULL,
    status TEXT NOT NULL,
    UNIQUE(player_id, genre, difficulty)
  )
`);

export default db;