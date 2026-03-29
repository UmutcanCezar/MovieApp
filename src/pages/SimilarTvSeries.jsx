import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import ErrorMessage from "../components/errorMessage";
import Loading from "../components/loading";
import TvSeriesList from "../components/TvSeries/TvSeriesList";

const api_URL = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_KEY;
const page = 1;
const language = "tr-Tr";

const SimilartvSeries = ({ tvSerieId }) => {
  const [TvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTvSeries() {
      try {
        const response = await fetch(
          `${api_URL}/tv/${tvSerieId}/similar?api_key=${api_key}&page=${page}&language=${language}`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();
        if (data.results) {
          const filtered_data = data.results.filter(
            (serie) => serie.poster_path != null,
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

    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMovies(data.results);
    //   });
  }, [tvSerieId]);
  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorMessage message={error} />;
  return <TvSeriesList TvSeries={TvSeries} title="Benzer Diziler" />;
};
export default SimilartvSeries;
