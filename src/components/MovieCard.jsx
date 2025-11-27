export default function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-item" onClick={onClick}>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <strong>{movie.title}</strong>
      <p>{movie.release_date}</p>
    </div>
  );
}
