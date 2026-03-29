export default function Footer() {
  return (
    <footer className="bg-light text-center text-white border-top border-body">
      <div className="container p-1 d-lg-flex align-items-center justify-content-between">
        <div className="text-center p-1 text-dark">
          2026 copyright&
          <a href="" className="text-dark">
            MovieApp
          </a>
        </div>
        <section>
          <a
            href="#!"
            className="btn btn-outline-dark btn-floating m-1"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="#!"
            className="btn btn-outline-dark btn-floating m-1"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="#!"
            className="btn btn-outline-dark btn-floating m-1"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="bi bi-twitter"></i>
          </a>
        </section>
      </div>
    </footer>
  );
}
