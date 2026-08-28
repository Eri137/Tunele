const GENRES = ["Pop", "Hip-Hop", "Rap", "Gospel", "R&B"];

function GenreSelector({ selectedGenre, onSelectGenre }) {
  return (
    <div>
      <div className="section-label">Genre</div>
      <div className="pill-row">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`pill ${selectedGenre === genre ? "active" : ""}`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreSelector;