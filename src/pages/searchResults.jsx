import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router";
import ErrorMessage from "../components/errorMessage";
import Loading from "../components/loading";
import MovieList from "../components/Movies/movieList";
import TvSeriesList from "../components/TvSeries/TvSeriesList";
import Pagination from "../components/pagination";

const api_URL = "https://api.themoviedb.org/3";
const api_key = "ae1af8842aafba205986d60ed16d5f43";
const language = "tr-Tr";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [onlyMovie, setOnlyMovie] = useState(true);
  const [tvSeries, setTvSeries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1;
  const [totalPage, setTotalPage] = useState(1);
  const [tvTotalPage, setTvTotalPage] = useState(1);
  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${api_URL}/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();
        setTotalPage(data.total_pages);
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

    async function getTvSeries() {
      try {
        const response = await fetch(
          `${api_URL}/search/tv?api_key=${api_key}&query=${query}&page=${page}&language=${language}`,
        );
        if (!response.ok) throw new Error("Hata Oluştu");
        const data = await response.json();
        setTvTotalPage(data.total_pages);

        if (data.results) {
          const filtered_data = data.results.filter(
            (tvSerie) => tvSerie.poster_path != null,
          );

          setTvSeries(filtered_data);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    getTvSeries();

    window.scrollTo({ top: 0, behavior: "smooth" });
    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMovies(data.results);
    //   });
  }, [query, page]);
  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorMessage message={error} />;
  return (
    <div className="container">
      <div className="filters mt-3">
        <button
          className="btn btn-dark ms-1"
          onClick={() => {
            setOnlyMovie(true);

            setSearchParams({
              q: query,
              page: Number(1),
            });
          }}
          disabled={onlyMovie}
        >
          Film
        </button>
        <button
          className="btn btn-dark ms-1"
          onClick={() => {
            setOnlyMovie(false);

            setSearchParams({
              q: query,
              page: Number(1),
            });
          }}
          disabled={!onlyMovie}
        >
          dizi
        </button>
      </div>
      {onlyMovie ? (
        <MovieList movies={movies} title={`Film Arama Sonuçları: ${query}`} />
      ) : (
        <TvSeriesList
          TvSeries={tvSeries}
          title={`Dizi Arama Sonuçları: ${query}`}
        />
      )}
      <Pagination
        setSearchParams={setSearchParams}
        page={page}
        totalPage={onlyMovie ? totalPage : tvTotalPage}
        query={query}
      />
    </div>
  );
};
export default SearchResults;
