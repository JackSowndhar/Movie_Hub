import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import About from "./About/About";
import Movie from "./Movie/Movie";
import WishList from "./WishlistPage/WishList";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar search={search} setSearch={setSearch} />
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="about" element={<About />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="wishlist" element={<WishList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
