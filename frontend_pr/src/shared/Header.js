import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useUserStore } from "../store/UserStore";

const Header = () => {
  const navigate = useNavigate();

  const userInfo = useUserStore((state) => state.user);
  const authToken = useUserStore((state) => state.authToken);

  const logout = useUserStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const username = userInfo?.userName;
  return (
    <div className="nav-header">
      <header>
        <nav
          className="nav-bar navbar navbar-expand-lg bg-body-tertiary"
          style={{ width: "100%" }}
        >
          <div className="container-fluid">
            <div className="logo">
              <Link to="/" style={{ textDecoration: "none", color: "#d5d5d5" }}>
                PR Approver
              </Link>
            </div>

            {username && (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    Hi,{" "}
                    {username.charAt(0).toUpperCase() +
                      username.slice(1).toLowerCase()}
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/newPullRequest"
                      style={{ textDecoration: "none", color: "#d5d5d5" }}
                    >
                      Create Pull Request
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      onClick={handleLogout}
                      style={{ textDecoration: "none", color: "#d5d5d5" }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {!username && (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "#d5d5d5" }}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "#d5d5d5" }}
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;

// <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                     <Link to='/post' className="nav-link active" aria-current="page">Hi, {username.charAt(0).toUpperCase() +username.slice(1).toLowerCase()}</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link to='/newPost' className="nav-link" aria-current="page">Create New Post</Link>
//                 </li>
//                 <li className="nav-item">
//                     <a onClick={logout} className="nav-link" >Logout</a>
//                 </li>

//                 </ul>
//             </div>
