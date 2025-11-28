import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchLatestSeries } from "../api";

function LatestSeries({ onSelectMovie }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getLatestSeries() {
      try {
        const latestSeries = await fetchLatestSeries();
        setSeries(latestSeries);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getLatestSeries();
  }, []);

  if (loading) {
    return <div className="loading">Loading latest series...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="popular-movies-page">
      <h2 className="section-title">Latest Series</h2>
      <div className="movie-grid">
        {series.map((item) => (
          <MovieCard key={item.id} movie={item} onClick={onSelectMovie} />
        ))}
      </div>
    </div>
  );
}

export default LatestSeries;