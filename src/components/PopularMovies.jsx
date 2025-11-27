import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api";
import MovieCard from "./MovieCard";

export default function PopularMovies({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (err) {
        console.error("Failed to load popular movies:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <p>Loading popular movies…</p>;
  }

  return (
    <div>
      <h2>Popular Movies Today</h2>

      <ul className="results-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onSelectMovie(movie)}  // This now works!
          />
        ))}
      </ul>
    </div>
  );
}