import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";
import Loading from "../components/loading";
import defaultpng from "../assets/profilephoto.png";
import SimilartvSeries from "./similarTvSeries";

const api_URL = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_KEY;
const page = 1;
const query = "batman";
const language = "tr-Tr";

const TvSeriesDetails = () => {
  const { id } = useParams();

  const [tvSerie, setTvSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function SetTvSeries() {
      try {
        const response = await fetch(
          `${api_URL}/tv/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();

        setTvSerie(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }
    SetTvSeries();

    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMovies(data.results);
    //   });
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (error) return <ErrorMessage message={error} />;
  return (
    <>
      <div
        className="text-white position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvSerie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="img-overlay">
          <div className="container d-flex justify-content-center align-items-center min-vh-100 ">
            <div className="row">
              <div className="col-md-3 d-none d-lg-block">
                <img
                  src={`https://image.tmdb.org/t/p/original/${tvSerie.poster_path}`}
                  alt={tvSerie.original_name}
                  className="img-fluid rounded shadow img-thumbnail"
                />
              </div>
              <div className="col-md-9">
                <div className="display-4">{tvSerie.original_name}</div>
                <p>
                  {tvSerie.release_date} <i className="bi bi-dot"></i>
                  <span>
                    {tvSerie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot">
                    {tvSerie.seasons.filter((s) => s.season_number > 0).length}{" "}
                    sezon
                  </i>
                </p>
                <p>
                  <span className="badge bg-warning">
                    {Math.round(tvSerie.vote_average) * 10}%
                  </span>
                </p>
                {tvSerie.overview && (
                  <p className="lead summary">
                    <strong>Özet : </strong>
                    {tvSerie.overview}
                  </p>
                )}
                {tvSerie.production_companies?.length > 0 &&
                  tvSerie.production_countries?.length > 0 && (
                    <div className="d-flex flex-column flex-md-row justify-content-around align-items-start producer">
                      <p className="d-flex flex-column text-center">
                        <strong>Yapımcı</strong>
                        <span>{tvSerie.production_companies[0]?.name}</span>
                      </p>

                      <p className="d-flex flex-column text-center">
                        <strong>Yapımcı Ülke</strong>
                        <span>{tvSerie.production_countries[0]?.name}</span>
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Kadro</h5>
          </div>
          <div className="card-body overflow-auto">
            <div className="row d-flex flex-nowrap gap-3 flex-column flex-md-row text-center">
              {tvSerie.credits.cast.map((actor) => (
                <div className="col-md-2 border" key={actor.id}>
                  <img
                    src={
                      actor.profile_path
                        ? "https://image.tmdb.org/t/p/original/" +
                          actor.profile_path
                        : defaultpng
                    }
                    alt={actor.name}
                    style={{
                      height: "196px",
                      width: "130px",
                    }}
                    className="img-fluid"
                  />
                  <p className="text-center mb-0">
                    <strong>{actor.name}</strong>
                  </p>
                  <p className="text-center mb-0">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SimilartvSeries tvSerieId={tvSerie.id} />
    </>
  );
};
export default TvSeriesDetails;
