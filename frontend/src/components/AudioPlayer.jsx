import { useRef, useState } from "react";

const DIFFICULTY_SETTINGS = {
  Easy: { segmentLength: 3 },
  Medium: { segmentLength: 2 },
  Hard: { segmentLength: 1 },
};

function AudioPlayer({ previewUrl, clipStart, difficulty, attemptNumber }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const stopTimeoutRef = useRef(null);

  const settings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.Easy;
  const currentSegment = Math.min(attemptNumber, 5);
  const playLength = settings.segmentLength * currentSegment;

  const playClip = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = clipStart;
    audio.playbackRate = 1.0;
    audio.play();
    setIsPlaying(true);

    stopTimeoutRef.current = setTimeout(() => {
      audio.pause();
      setIsPlaying(false);
    }, playLength * 1000);
  };

  const handlePlayClick = () => {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }
    playClip();
  };

  if (!previewUrl) {
    return (
      <div className="card">
        <p>No audio available for this song yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <audio ref={audioRef} src={previewUrl} />

      <div className="segment-bars">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={`segment-bar ${i < currentSegment ? "filled" : ""}`} />
        ))}
      </div>

      <button className="play-button" onClick={handlePlayClick} disabled={isPlaying}>
        {isPlaying ? "▶ Playing..." : "▶ Play clip"}
      </button>
    </div>
  );
}

export default AudioPlayer;