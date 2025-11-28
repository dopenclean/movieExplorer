import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../api";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";

function Home({ onSelectMovie, preloadedData }) {
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Use preloaded data if available, otherwise fetch
                const movies = preloadedData || await fetchPopularMovies();
                if (movies && movies.length > 0) {
                    setFeaturedMovie(movies[0]); // First movie as hero
                    setTrendingMovies(movies.slice(1, 5)); // Next 4 as trending preview
                }
            } catch (error) {
                console.error("Failed to load home data:", error);
            }
        };
        loadData();
    }, [preloadedData]);

    return (
        <div className="home-container">
            {/* Hero Section */}
            {featuredMovie && (
                <div className="hero">
                    <img
                        src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                        alt={featuredMovie.title}
                        className="hero-image"
                    />
                    <div className="hero-overlay" />
                    <div className="hero-content">
                        <h1 className="hero-title">{featuredMovie.title}</h1>
                        <p className="hero-overview">{featuredMovie.overview}</p>
                        <button onClick={() => onSelectMovie(featuredMovie)}>
                            More Details
                        </button>
                    </div>
                </div>
            )}

            {/* Search Section */}
            <div className="search-section">
                <h2 className="section-title">Find Movies</h2>
                <MovieSearch onSelectMovie={onSelectMovie} />
            </div>

            {/* Trending Preview */}
            <div className="trending-section">
                <h2 className="section-title">Trending Now</h2>
                <div className="movie-grid">
                    {trendingMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={onSelectMovie}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
