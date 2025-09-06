import React, { useEffect, useState } from "react";
import "./WishList.css";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((movie) => (
            <div key={movie.id} className="wishlist-card">
              <div className="poster-wrapper">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <p>No Image</p>
                )}
                <span className="duration">
                  {movie.runtime
                    ? `${Math.floor(movie.runtime / 60)}:${movie.runtime % 60}`
                    : "—"}
                </span>
              </div>
              <h3 className="movie-title">{movie.title}</h3>
              <p className="meta">
                {movie.genres && movie.genres.length > 0
                  ? movie.genres[0].name
                  : "Movie"}{" "}
                • {movie.release_date ? movie.release_date.slice(0, 4) : "—"}
              </p>
              <center>
                <button
                  onClick={() => removeFromWishlist(movie.id)}
                  className="remove-button"
                >
                  Remove from wishlist
                </button>
              </center>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No movies in your wishlist yet.</p>
      )}
    </div>
  );
};

export default WishList;
