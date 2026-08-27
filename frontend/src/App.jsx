import { useState, useEffect } from "react";
import GenreSelector from "./components/GenreSelector";
import DifficultySelector from "./components/DifficultySelector";
import AudioPlayer from "./components/AudioPlayer";
import GuessBoard from "./components/GuessBoard";
import GuessInput from "./components/GuessInput";
import GameResultModal from "./components/GameResultModal";
import HowToPlayModal from "./components/HowToPlayModal";
import { getPlayerId } from "./utils/playerId";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("Pop");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [dailySong, setDailySong] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [revealSong, setRevealSong] = useState(null);
  const [showHowToPlay, setShowHowToPlay] = useState(true);

  const playerId = getPlayerId();

  const startRound = async (genre, difficulty) => {
    setGuesses([]);
    setGameStatus("playing");
    setRevealSong(null);

    try {
      const res = await fetch("http://localhost:3001/api/start-round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, genre, difficulty }),
      });
      const data = await res.json();
      setDailySong(data);
    } catch (error) {
      console.error(error);
      setDailySong(null);
    }
  };

  useEffect(() => {
    if (!selectedGenre || !selectedDifficulty) return;
    startRound(selectedGenre, selectedDifficulty);
  }, [selectedGenre, selectedDifficulty]);

  const handleSubmitGuess = async (guessedSong) => {
    if (gameStatus !== "playing") return;

    try {
      const res = await fetch("http://localhost:3001/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId,
          genre: selectedGenre,
          difficulty: selectedDifficulty,
          guessedSong,
        }),
      });
      const result = await res.json();

      setGuesses(result.guesses);
      setGameStatus(result.status);
      setRevealSong(result.revealSong);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayAgain = () => {
    startRound(selectedGenre, selectedDifficulty);
  };

  return (
    <div className="app">
      <h1 className="app-title">🎵 Tunele</h1>

      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}

      <div className="section">
        <GenreSelector selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
      </div>

      <div className="section">
        <DifficultySelector selectedDifficulty={selectedDifficulty} onSelectDifficulty={setSelectedDifficulty} />
      </div>

      <div className="section">
        <AudioPlayer
          previewUrl={dailySong?.previewUrl}
          clipStart={dailySong?.clipStart}
          difficulty={selectedDifficulty}
          attemptNumber={guesses.length + 1}
        />
      </div>

      <div className="section">
        <GuessBoard guesses={guesses} />
        <GuessInput onSubmitGuess={handleSubmitGuess} disabled={gameStatus !== "playing" || !dailySong} />
      </div>

      {revealSong && (
        <GameResultModal
          status={gameStatus}
          song={revealSong}
          guessCount={guesses.length}
          onClose={() => setRevealSong(null)}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;