export default function MovieDetails({ movie, onClose }) {
  return (
    <div className="details-overlay">
      <div className="details-box">
        <button onClick={onClose}>Close</button>

        <h2>{movie.title}</h2>
        <p>Release: {movie.release_date}</p>
        <p>{movie.overview}</p>

        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        )}
      </div>
    </div>
  );
}
