import { Link } from "react-router";

export default function TvSerie({ tvSerie_Data }) {
  return (
    <div className="col">
      <div className="card TvSerie position-relative h-100">
        <Link className="stretched-link" to={`/tv/${tvSerie_Data.id}`}>
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + tvSerie_Data.poster_path
            }
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <h2 className="card-title h5">{tvSerie_Data.original_name}</h2>
        </div>
      </div>
    </div>
  );
}
