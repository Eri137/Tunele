import { songBank } from "../data/songs.js";

export function getRandomSong(genre, difficulty) {
  const pool = songBank[genre]?.[difficulty.toLowerCase()];

  if (!pool || pool.length === 0) {
    return null;
  }

  const playable = pool.filter((song) => song.previewUrl);

  if (playable.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * playable.length);
  return playable[index];
}