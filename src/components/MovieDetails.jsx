import { motion } from "framer-motion";


export default function MovieDetails({ movie, onClose }) {
  return (
    <motion.div
      className="details-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="details-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button className="details-close-btn" onClick={onClose}>
          &times;
        </button>

        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="details-poster"
          />
        )}

        <div className="details-content">
          <h2>{movie.title}</h2>
          <div className="details-meta">
            <span>Release: {movie.release_date}</span>
            {movie.vote_average && (
              <span style={{ marginLeft: "1rem" }}>
                Rating: {movie.vote_average}/10
              </span>
            )}
          </div>
          <p className="details-overview">{movie.overview}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
