import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/searchResults";
import TvSeries from "./pages/TvSeries";
import MainLayout from "./layouts/MainLayout";
import TvSeriesDetails from "./pages/TvSeriesDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "TvSeries", element: <TvSeries /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "tv/:id", element: <TvSeriesDetails /> },
      { path: "search", element: <SearchResults /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}
export default App;
