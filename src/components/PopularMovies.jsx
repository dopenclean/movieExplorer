import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api";
import MovieCard from "./MovieCard";

function PopularMovies({ onSelectMovie, preloadedData }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Use preloaded data if available, otherwise fetch
        const data = preloadedData || await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [preloadedData]);

  if (loading) return <div className="loading">Loading popular movies...</div>;

  return (
    <div className="popular-movies-page">
      <h2 className="section-title">Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onSelectMovie}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularMovies;