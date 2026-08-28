import db from "../db.js";

export function startNewRound(playerId, genre, difficulty, song) {
  db.prepare(
    `INSERT INTO game_progress (player_id, genre, difficulty, song, guesses, status)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(player_id, genre, difficulty)
     DO UPDATE SET song = excluded.song, guesses = excluded.guesses, status = excluded.status`
  ).run(playerId, genre, difficulty, JSON.stringify(song), JSON.stringify([]), "playing");
}

export function loadProgress(playerId, genre, difficulty) {
  const row = db
    .prepare(
      `SELECT song, guesses, status FROM game_progress
       WHERE player_id = ? AND genre = ? AND difficulty = ?`
    )
    .get(playerId, genre, difficulty);

  if (!row) {
    return null;
  }

  return {
    song: JSON.parse(row.song),
    guesses: JSON.parse(row.guesses),
    status: row.status,
  };
}

export function saveProgress(playerId, genre, difficulty, guesses, status) {
  db.prepare(
    `UPDATE game_progress SET guesses = ?, status = ?
     WHERE player_id = ? AND genre = ? AND difficulty = ?`
  ).run(JSON.stringify(guesses), status, playerId, genre, difficulty);
}