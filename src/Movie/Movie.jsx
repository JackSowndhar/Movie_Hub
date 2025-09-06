import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";

const Movie = () => {
  const api_key = import.meta.env.VITE_TMDB_API_KEY;
  const { id } = useParams();
  const [specificMovie, setSpecificMovie] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
      .then((res) => res.json())
      .then((data) => setSpecificMovie(data));
  }, [id, api_key]);

  const addToWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some((movie) => movie.id === specificMovie.id)) {
      wishlist.push(specificMovie);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${specificMovie.title} added to wishlist!`);
    } else {
      alert(`${specificMovie.title} is already in your wishlist!`);
    }
  };

  return (
    <div className="movie-container">
      {specificMovie && (
        <>
          <div className="left">
            <img
              src={`https://image.tmdb.org/t/p/w500/${specificMovie.poster_path}`}
              alt={specificMovie.title}
            />
          </div>
          <div className="right">
            <h2>Title - {specificMovie.title}</h2>
            <p>
              <b>Overview</b> - {specificMovie.overview}
            </p>
            <p>Release Date - {specificMovie.release_date}</p>
            <p>Rating - {specificMovie.vote_average}</p>
            <p>Vote Count - {specificMovie.vote_count}</p>
            <button className="button" onClick={addToWishlist}>
              Add to Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
