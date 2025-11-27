const API_KEY = import.meta.env.VITE_TMDB_KEY;

export async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed API Request");
  }

  const data = await res.json();
  return data.results;
}

export async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed API Request");
  const data = await res.json();
  return data.results;
}