import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";
import TvSerie from "../components/TvSeries/TvSerie";
import Loading from "../components/loading";
import TvSeriesList from "../components/TvSeries/TvSeriesList";

const api_URL = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_KEY;
const page = 1;
const language = "tr-Tr";

export default function TvSeries() {
  const [tvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTvSeries() {
      try {
        const response = await fetch(
          `${api_URL}/tv/popular?api_key=${api_key}&page=${page}&language=${language}`,
        );
        if (!response.ok) throw new Error("Hata Oluştu");
        const data = await response.json();
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
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorMessage message={error} />;
  return <TvSeriesList TvSeries={tvSeries} title={"Dizi Listesi"} />;
}
