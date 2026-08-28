import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../config";

function GuessInput({ onSubmitGuess, disabled }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setSearchError(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          setResults([]);
          setSearchError("Search failed — try again in a moment.");
          return;
        }

        setSearchError(null);
        setResults(data.slice(0, 8));
      } catch {
        setResults([]);
        setSearchError("Search failed — try again in a moment.");
      }
    }, 100); 

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (song) => {
    onSubmitGuess(song);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="guess-input-wrapper">
      <input
        type="text"
        className="guess-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a song name..."
        disabled={disabled}
      />
      {searchError && <div className="guess-hint">{searchError}</div>}
      {results.length > 0 && (
        <div className="guess-results">
          {results.map((song) => (
            <div key={song.id} onClick={() => handleSelect(song)} className="guess-result-item">
              {song.name} — {song.artist}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GuessInput;