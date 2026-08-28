# Tunele

Tunele is a Wordle-style music guessing game. Pick a genre and difficulty, listen to a short clip, and guess the song before you run out of attempts.

## Features

* Genre and difficulty picker (Pop, Hip-Hop, Rap, Gospel, R&B; Easy/Medium/Hard) that determines how long each audio clip plays
* Song clips streamed from the iTunes Search API, with the playable snippet growing longer after each wrong guess
* Live song-name autocomplete search while guessing
* 5 guesses per round, with a reveal screen (song, artist, album art) once you win or lose
* Per-player progress stored server-side (SQLite), so your current round survives a page refresh
* First-time "How to Play" walkthrough modal

## Tech stack

Backend — Node.js, Express, better-sqlite3 (raw SQL, no ORM), iTunes Search API for track lookup and audio previews.

Frontend — React, Vite.

## Project structure

```
Tunele/
  backend/   Express API - song search, round management, guess scoring, SQLite progress storage
  frontend/  React + Vite frontend - game UI
```

## Getting started

1. Backend

```
cd backend
npm install
# optional: create a .env file to override the default port (3001)
npm run dev
```

Runs at http://localhost:3001.

2. Frontend

```
cd frontend
npm install
# optional: create a .env file with:
# VITE_API_URL=http://localhost:3001
npm run dev
```

Runs at http://localhost:5173.
