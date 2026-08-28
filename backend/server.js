import express from "express";
import cors from "cors";
import "dotenv/config";
import { searchItunes } from "./utils/itunes.js";
import { getRandomSong } from "./utils/randomSong.js";
import { startNewRound, loadProgress, saveProgress } from "./utils/progress.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const tracks = await searchItunes(query, 10);
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search tracks" });
  }
});

// Starts a brand-new random round for this genre/difficulty, wiping any
// previous round. Called on page load, genre/difficulty change, and "Play Again".
app.post("/api/start-round", (req, res) => {
  const { playerId, genre, difficulty } = req.body;

  if (!playerId || !genre || !difficulty) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const song = getRandomSong(genre, difficulty);

  if (!song) {
    return res.status(404).json({ error: "No songs found for that genre and difficulty" });
  }

  startNewRound(playerId, genre, difficulty, song);

  res.json({
    previewUrl: song.previewUrl,
    clipStart: song.clipStart,
  });
});

app.post("/api/guess", (req, res) => {
  const { playerId, genre, difficulty, guessedSong } = req.body;

  if (!playerId || !genre || !difficulty || !guessedSong) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const progress = loadProgress(playerId, genre, difficulty);

  if (!progress) {
    return res.status(400).json({ error: "No active round — start a round first" });
  }

  if (progress.status !== "playing") {
    return res.status(400).json({ error: "This round is already finished" });
  }

  const correctSong = progress.song;
  const existingGuesses = progress.guesses;
  const attemptNumber = existingGuesses.length + 1;

  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const isCorrect =
    normalize(guessedSong.name) === normalize(correctSong.name) &&
    normalize(guessedSong.artist) === normalize(correctSong.artist);

  const newGuess = {
    name: guessedSong.name,
    artist: guessedSong.artist,
    correct: isCorrect,
  };

  const updatedGuesses = [...existingGuesses, newGuess];

  let newStatus = "playing";
  if (isCorrect) {
    newStatus = "won";
  } else if (attemptNumber >= 5) {
    newStatus = "lost";
  }

  saveProgress(playerId, genre, difficulty, updatedGuesses, newStatus);

  let revealSong = null;
  if (newStatus !== "playing") {
    revealSong = {
      name: correctSong.name,
      artist: correctSong.artist,
      albumArt: correctSong.albumArt,
      previewUrl: correctSong.previewUrl,
      clipStart: correctSong.clipStart,
    };
  }

  res.json({ guesses: updatedGuesses, status: newStatus, revealSong });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});