export default function Pagination({
  setSearchParams,
  page,
  totalPage,
  query,
}) {
  return (
    <div className="container">
      <div className="d-flex justify-content-center my-1">
        <button
          className="btn text-dark"
          onClick={() =>
            setSearchParams({
              q: query,
              page: Number(1),
            })
          }
          disabled={page <= 1}
        >
          <i className="bi bi-skip-backward-fill"></i>
        </button>
        <button
          className="btn text-dark"
          onClick={() =>
            setSearchParams({
              q: query,
              page: Number(page) - 1,
            })
          }
          disabled={page <= 1}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <p className="mt-2">{`${page}/${totalPage}`}</p>
        <button
          className="btn text-dark"
          onClick={() =>
            setSearchParams({
              q: query,
              page: Number(page) + 1,
            })
          }
          disabled={page >= totalPage}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
        <button
          className="btn text-dark"
          onClick={() =>
            setSearchParams({
              q: query,
              page: Number(totalPage),
            })
          }
        >
          <i className="bi bi-skip-forward-fill"></i>
        </button>
      </div>
    </div>
  );
}
