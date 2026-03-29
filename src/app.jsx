import React from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/searchResults";
import TvSeries from "./pages/TvSeries";
import MainLayout from "./layouts/MainLayout";
import TvSeriesDetails from "./pages/TvSeriesDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="TvSeries" element={<TvSeries />} />
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="tv/:id" element={<TvSeriesDetails />} />
        <Route path="search" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default App;
