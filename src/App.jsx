import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import PopularMovies from "./components/PopularMovies";
import LatestMovies from "./components/LatestMovies";
import PopularSeries from "./components/PopularSeries";
import LatestSeries from "./components/LatestSeries";
import LoadingScreen from "./components/LoadingScreen";
import { useState, useEffect } from "react";
import { fetchPopularMovies } from "./api";

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
  const [preloadedData, setPreloadedData] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const location = useLocation();

  // Preload data and images
  useEffect(() => {
    const preloadImages = (imageUrls) => {
      return Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error to not block loading
            img.src = url;
          });
        })
      );
    };

    const loadData = async () => {
      try {
        const movies = await fetchPopularMovies();

        // Collect image URLs to preload
        const imageUrls = movies.slice(0, 10).map((movie) =>
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        );

        // Add backdrop for hero
        if (movies[0]?.backdrop_path) {
          imageUrls.push(`https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`);
        }

        // Preload images
        await preloadImages(imageUrls);

        setPreloadedData(movies);
        setDataReady(true);
      } catch (error) {
        console.error("Failed to preload data:", error);
        setDataReady(true); // Continue even if preload fails
      }
    };

    loadData();
  }, []);

  // Hide loading screen only when both animation and data are ready
  useEffect(() => {
    if (animationComplete && dataReady) {
      setIsLoading(false);
    }
  }, [animationComplete, dataReady]);

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
          <LoadingScreen onComplete={() => setAnimationComplete(true)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <nav>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/popular" className={location.pathname === "/popular" ? "active" : ""}>Popular Movies</Link>
            <Link to="/latest" className={location.pathname === "/latest" ? "active" : ""}>Latest Movies</Link>
            <Link to="/popular-series" className={location.pathname === "/popular-series" ? "active" : ""}>Popular Series</Link>
            <Link to="/latest-series" className={location.pathname === "/latest-series" ? "active" : ""}>Latest Series</Link>
          </nav>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home onSelectMovie={setSelectedMovie} preloadedData={preloadedData} />
                  </PageTransition>
                }
              />
              <Route
                path="/popular"
                element={
                  <PageTransition>
                    <PopularMovies onSelectMovie={setSelectedMovie} preloadedData={preloadedData} />
                  </PageTransition>
                }
              />
              <Route
                path="/latest"
                element={
                  <PageTransition>
                    <LatestMovies onSelectMovie={setSelectedMovie} />
                  </PageTransition>
                }
              />
              <Route
                path="/popular-series"
                element={
                  <PageTransition>
                    <PopularSeries onSelectMovie={setSelectedMovie} />
                  </PageTransition>
                }
              />
              <Route
                path="/latest-series"
                element={
                  <PageTransition>
                    <LatestSeries onSelectMovie={setSelectedMovie} />
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