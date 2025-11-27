import { useState } from "react";
import { searchMovies } from "../api";
import MovieCard from "./MovieCard";

export default function MovieSearch({ onSelectMovie }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Movie Search</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>

      {loading && (
        <div className="results-container">
            {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" />
            ))}
        </div>
        )}

      {error && <div className="error-card">{error}</div>}

      {!loading && movies.length === 0 && !query && (
        <p style={{ opacity: 0.6 }}>Start by searching any movie… 🍿</p>
        )}


      <ul className="results-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)} />
        ))}
      </ul>
    </div>
  );
}
