export default function WatchListButton({ watches, setisWatchListOpen }) {
  return (
    <div className="mb-2 mb-lg-0 ms-1">
      <button
        type="button"
        onClick={() => setisWatchListOpen((prev) => !prev)}
        className="btn btn-outline-light position-relative"
      >
        <i className="bi bi-heart"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {watches.length}
        </span>
      </button>
    </div>
  );
}
