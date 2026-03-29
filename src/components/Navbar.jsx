import { NavLink } from "react-router";
import Logo from "./logo";
import SearchForm from "./searchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container">
        <Logo />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarNav">
          <div className="mx-auto">
            <SearchForm />
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/TvSeries">
                Tv Series
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
