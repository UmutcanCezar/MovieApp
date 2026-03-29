import { NavLink } from "react-router-dom";
export default function Logo() {
  return (
    <NavLink to="/" className="navbar-brand">
      MovieApp
    </NavLink>
  );
}
