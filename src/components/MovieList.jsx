import { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <ul>
        {movies.map((m) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </div>
  );
}
