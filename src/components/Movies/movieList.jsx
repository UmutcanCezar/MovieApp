import { useState } from "react";
import Movie from "./movie";
export default function MovieList({ movies, title }) {
  const [isMovieListOpen, setIsMovieListOpen] = useState(true);
  return (
    <div className="container my-3">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between">
          <h2 className="h5">{title}</h2>
          <button
            className="btn text-bg-danger"
            onClick={() => setIsMovieListOpen((prev) => !prev)}
          >
            {isMovieListOpen ? (
              <i className="bi bi-dash-circle"></i>
            ) : (
              <i className="bi bi-plus-circle"></i>
            )}
          </button>
        </div>
        {isMovieListOpen && (
          <div className="card-body">
            {movies.length > 0 ? (
              <div
                id="movie-list"
                className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"
              >
                {movies.map((m, index) => (
                  <Movie key={index} movie_data={m} />
                ))}
              </div>
            ) : (
              <div>Film Bulunamadı</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
