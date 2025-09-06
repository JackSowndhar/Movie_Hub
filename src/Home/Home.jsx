import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ( { search }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // for carousel

  const api_key = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "";

        if (search.trim() === "") {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
        } else {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(
            search
          )}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [search, api_key]);

  useEffect(() => {
    if (search.trim() === "" && movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [movies, search]);


  return (
    <div className="home-container">
      <div>
        {movies.length > 0 ? (
          search.trim() === "" ? (
            <div className="carousel-container">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`carousel-slide ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  {movie.poster_path ? (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="carousel-title">{movie.title}</div>
                    </>
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid-container">
              {movies.map((movie) => (
                <Link to={`/movie/${movie.id}`}>
                  <div key={movie.id} className="movie-card">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                      />
                    ) : (
                      <p>No Image Available</p>
                    )}
                    <h3>{movie.title}</h3>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Rating: {movie.vote_average}</p>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
