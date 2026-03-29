import WatchListMovie from "./watchListMovie";
export default function WatchList({
  watches,
  isWatchListOpen,
  onRemoveList,
  onHanleSelectedMovie,
}) {
  if (!isWatchListOpen) {
    return;
  }
  return (
    <div className=" mt-3">
      <div className="card shadow">
        <div className="card-header">
          <h2 className="h5 mb-0">Watch List</h2>
        </div>
        <div className="card-body">
          {watches.length > 0 ? (
            <div
              id="movie-list"
              className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-1 g-lg-2"
            >
              {watches.map((m, index) => (
                <WatchListMovie
                  key={index}
                  movie_data={m}
                  onRemoveList={onRemoveList}
                />
              ))}
            </div>
          ) : (
            <div>Film Bulunamadı</div>
          )}
        </div>
      </div>
    </div>
  );
}
