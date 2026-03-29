import { Link } from "react-router";

export default function Movie({ movie_data }) {
  // const imgUrl = "1.jpg";
  // const baslik = "Kaptan Amerika";
  // const aciklama =
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis";

  return (
    <div className="col">
      <div className="card movie position-relative h-100">
        <Link to={`/movies/${movie_data.id}`} className="stretched-link">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + movie_data.poster_path
            }
            alt=""
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <h2 className="card-title h5">{movie_data.title}</h2>
        </div>
      </div>
    </div>
  );
}
