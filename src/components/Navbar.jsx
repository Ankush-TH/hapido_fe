import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid mb-5 mt-3">
        <ul className="nav" style={{ justifyContent: "space-between" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/requests">Requests</Link>
          </li>
          <li>
            <Link to="/companyDetails">My Company</Link>
          </li>
          <li className="text-right">
            <button
              className="btn btn-danger navbar-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
