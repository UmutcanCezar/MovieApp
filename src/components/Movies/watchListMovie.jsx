export default function WatchListMovie({
  movie_data,
  onAddToList,
  onRemoveList,
}) {
  // const imgUrl = "1.jpg";
  // const baslik = "Kaptan Amerika";
  // const aciklama =
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis";

  return (
    <div className="col ">
      {
        <div className="card movie position-relative">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + movie_data.poster_path
            }
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <h2 className="card-title h5">{movie_data.title}</h2>
            {/* <p className="card-text mb-0">{movie_data.aciklama}</p> */}
            {movie_data.is_new && (
              <span className="badge bg-danger m-1 position-absolute top-0 end-0">
                New
              </span>
            )}
            <button
              className="btn btn-link fs-5 text-danger position-absolute top-0 start-0"
              onClick={() => onRemoveList(movie_data)}
            >
              <i className="bi bi-dash-circle"></i>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
