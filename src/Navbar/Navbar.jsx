import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ search, setSearch }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">The Hub of Movie</h1>
      <div className="nav-links">
        <input
          type="text"
          placeholder="Search movies..."
          className="nav-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
