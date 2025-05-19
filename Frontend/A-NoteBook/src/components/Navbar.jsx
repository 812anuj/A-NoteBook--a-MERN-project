import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              to="/"
            >
              A-NoteBook
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              to="/about"
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link disabled">Disabled</span>
          </li>
        </ul>

        <div className="d-flex">
          {!isLoggedIn ? (
            <>
              <Link className="btn btn-outline-warning me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-warning" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


