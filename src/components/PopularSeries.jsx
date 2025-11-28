import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchPopularSeries } from "../api";

function PopularSeries({ onSelectMovie }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPopularSeries() {
      try {
        const popularSeries = await fetchPopularSeries();
        setSeries(popularSeries);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getPopularSeries();
  }, []);

  if (loading) {
    return <div className="loading">Loading popular series...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="popular-movies-page">
      <h2 className="section-title">Popular Series</h2>
      <div className="movie-grid">
        {series.map((item) => (
          <MovieCard key={item.id} movie={item} onClick={onSelectMovie} />
        ))}
      </div>
    </div>
  );
}

export default PopularSeries;