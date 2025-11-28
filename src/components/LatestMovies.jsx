import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchLatestMovies } from "../api";

function LatestMovies({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getLatestMovies() {
      try {
        const latestMovies = await fetchLatestMovies();
        setMovies(latestMovies);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getLatestMovies();
  }, []);

  if (loading) {
    return <div className="loading">Loading latest movies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="popular-movies-page">
      <h2 className="section-title">Latest Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onSelectMovie} />
        ))}
      </div>
    </div>
  );
}

export default LatestMovies;