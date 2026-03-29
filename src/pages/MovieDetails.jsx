import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import ErrorMessage from "../components/errorMessage";
import Loading from "../components/loading";
import defaultpng from "../assets/profilephoto.png";
import SimilarMovies from "./similarMovies";

const api_URL = "https://api.themoviedb.org/3";
const api_key = process.env.REACT_APP_TMDB_KEY;
const page = 1;
const query = "batman";
const language = "tr-Tr";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${api_URL}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`,
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();

        setMovie(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }
    getMovie();

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
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
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
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded shadow img-thumbnail"
                />
              </div>
              <div className="col-md-9">
                <div className="display-4">{movie.title}</div>
                <p>
                  {movie.release_date} <i className="bi bi-dot"></i>
                  <span>
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot">{movie.runtime} dk</i>
                </p>
                <p>
                  <span className="badge bg-warning">
                    {Math.round(movie.vote_average) * 10}%
                  </span>
                </p>
                {movie.overview && (
                  <p className="lead summary">
                    <strong>Özet : </strong>
                    {movie.overview}
                  </p>
                )}

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center producer ">
                  {movie.production_companies.length > 0 && (
                    <p className="d-flex flex-column text-center">
                      <strong>Yapımcı</strong>{" "}
                      <span>{movie.production_companies[0].name} </span>
                    </p>
                  )}
                  {movie.credits.crew.length > 0 && (
                    <>
                      <p className="d-flex flex-column text-center">
                        <strong>Yönetmen</strong>
                        <span>{movie.credits.crew[0].name} </span>
                      </p>
                      <p className="d-flex flex-column text-center">
                        <strong>Senarist</strong>
                        <span>{movie.credits.crew[1].name} </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {movie.credits.cast.length > 0 && (
        <div className="container my-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Kadro</h5>
            </div>
            <div className="card-body overflow-auto actor_card">
              <div className="row d-flex flex-nowrap gap-3 flex-column flex-md-row text-center">
                {movie.credits.cast.map((actor) => (
                  <div className="col-md-2 border " key={actor.id}>
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
      )}
      <SimilarMovies movieId={movie.id} />
    </>
  );
};
export default MovieDetails;
