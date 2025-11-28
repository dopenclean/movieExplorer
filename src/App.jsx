import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import PopularMovies from "./components/PopularMovies";
import LoadingScreen from "./components/LoadingScreen";
import { useState, useEffect } from "react";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Prevent scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <nav>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/popular" className={location.pathname === "/popular" ? "active" : ""}>Popular Movies</Link>
          </nav>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home onSelectMovie={setSelectedMovie} />
                  </PageTransition>
                }
              />
              <Route
                path="/popular"
                element={
                  <PageTransition>
                    <PopularMovies onSelectMovie={setSelectedMovie} />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>

          <AnimatePresence>
            {selectedMovie && (
              <MovieDetails
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}