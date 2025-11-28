import React from "react";


function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
        }}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0] || "N/A"}</p>
      </div>
    </div>
  );
}

export default MovieCard;
