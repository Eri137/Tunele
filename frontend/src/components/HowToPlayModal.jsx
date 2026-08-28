function HowToPlayModal({ onClose }) {
  const steps = [
    "Pick a genre and a difficulty.",
    "Press play to hear a short clip.",
    "Search for your guess and select it.",
    "Each wrong guess unlocks a longer clip.",
    "Get it right before you run out of guesses!",
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-card howto-card">
        <div className="howto-header">
          <h2 className="howto-title">🎵 How to Play</h2>
          <div className="howto-actions">
            <button className="howto-gotit" onClick={onClose}>
              Got it
            </button>
            <button className="modal-close-x" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <p className="howto-intro">
          Guess the song of the day in 5 tries. Each difficulty has its own different song, so switching difficulty starts a fresh round.
        </p>

        <ol className="howto-list">
          {steps.map((step, i) => (
            <li key={i} className="howto-step">
              <span className="howto-step-number">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default HowToPlayModal;