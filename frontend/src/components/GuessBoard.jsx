function GuessBoard({ guesses }) {
  const totalAttempts = 5;
  const rows = Array.from({ length: totalAttempts }, (_, i) => guesses[i] || null);

  
  return (
    <div>
      <div className="section-label">Guesses</div>
      {rows.map((guess, index) => (
        <div key={index} className={`guess-row ${guess?.correct ? "correct" : ""} ${!guess ? "empty" : ""}`}>
          {guess ? (
            <span className={`guess-name ${guess.correct ? "correct" : ""}`}>
              {guess.name} — {guess.artist} {guess.correct ? "✅" : "❌"}
            </span>
          ) : (
            `Attempt ${index + 1}`
          )}
        </div>
      ))}
    </div>
  );
}

export default GuessBoard;