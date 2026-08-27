import { useRef, useEffect } from "react";

function GameResultModal({ status, song, guessCount, onClose, onPlayAgain }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    audio.currentTime = song.clipStart || 0;
    audio.playbackRate = 1.0;
    audio.play();
  }, [song]);

  if (!song) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close-x" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2>{status === "won" ? "🎉 You got it!" : "😔 Out of guesses"}</h2>

        {song.albumArt && <img src={song.albumArt} alt={song.name} className="modal-art" />}

        <p style={{ fontWeight: "bold", margin: "4px 0" }}>{song.name}</p>
        <p style={{ margin: "4px 0", color: "var(--color-muted)" }}>{song.artist}</p>

        {status === "won" && (
          <p style={{ marginTop: "8px" }}>
            Guessed in {guessCount} {guessCount === 1 ? "try" : "tries"}
          </p>
        )}

        <audio ref={audioRef} src={song.previewUrl} />

        <button
          className="modal-close"
          onClick={() => {
            onPlayAgain();
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameResultModal;