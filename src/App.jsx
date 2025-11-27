import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import PopularMovies from "./components/PopularMovies";
import { useState } from "react";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="App">
      <h1>Movie Explorer</h1>

      {/* NAVIGATION */}
      <nav>
        <Link to="/" style={{ marginRight: "12px" }}>Home</Link>
        <Link to="/popular">Popular Movies</Link>
      </nav>

      {/* PAGE ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MovieSearch onSelectMovie={setSelectedMovie} />
              {selectedMovie && (
                <MovieDetails
                  movie={selectedMovie}
                  onClose={() => setSelectedMovie(null)}
                />
              )}
            </>
          }
        />

        {/* THIS IS THE ONLY CHANGES */}
        <Route 
          path="/popular" 
          element={
            <>
              <PopularMovies onSelectMovie={setSelectedMovie} />
              {selectedMovie && (
                <MovieDetails
                  movie={selectedMovie}
                  onClose={() => setSelectedMovie(null)}
                />
              )}
            </>
          } 
        />
      </Routes>
    </div>
  );
}