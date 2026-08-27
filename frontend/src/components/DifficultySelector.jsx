const DIFFICULTIES = ["Easy", "Medium", "Hard"];

function DifficultySelector({ selectedDifficulty, onSelectDifficulty }) {
  return (
    <div>
      <div className="section-label">Difficulty</div>
      <div className="pill-row">
        {DIFFICULTIES.map((level) => (
          <button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className={`pill difficulty-${level.toLowerCase()} ${
              selectedDifficulty === level ? "active" : ""
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;