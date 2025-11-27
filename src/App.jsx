import "./App.css";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import { useState } from "react";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="App">
      <h1>Movie Explorer 🎬</h1>

      <MovieSearch onSelectMovie={setSelectedMovie} />

      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
