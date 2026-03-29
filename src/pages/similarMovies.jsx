import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import ErrorMessage from "../components/errorMessage";
import Loading from "../components/loading";
import MovieList from "../components/Movies/movieList";

const api_URL = "https://api.themoviedb.org/3";
const api_key = "ae1af8842aafba205986d60ed16d5f43";
const page = 1;
const language = "tr-Tr";

const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${api_URL}/movie/${movieId}/similar?api_key=${api_key}&page=${page}&language=${language}`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();
        if (data.results) {
          const filtered_data = data.results.filter(
            (movie) => movie.poster_path != null,
          );

          setMovies(filtered_data);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }
    getMovies();

    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMovies(data.results);
    //   });
  }, [movieId]);
  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorMessage message={error} />;
  return <MovieList movies={movies} title="Benzer Filmler" />;
};
export default SimilarMovies;
