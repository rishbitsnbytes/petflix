import "./navbar.css";
import petflixLogoDark from "assets/others/petflix-logo-dark-gif.gif";
import petflixLogoLight from "assets/others/petflix-logo-light-gif.gif";
import { SearchBar, Logout } from "components";
import { useTheme, useAuth, useVideos } from "contexts";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const { authDispatch, isAuth, authLoading } = useAuth();
  const { videosSearchText } = useVideos();
  const [searchText, setSearchText] = useState(videosSearchText);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const getActiveStyles = ({ isActive }) => {
    return isActive
      ? "btn relative mx-0-5 my-1 w-max h-max flex-row flex-justify-between flex-align-center gap-0-5 active-link"
      : "btn relative mx-0-5 my-1 w-max h-max flex-row flex-justify-between flex-align-center gap-0-5";
  };

  useEffect(() => {
    localStorage.setItem("petflix-theme", theme);
  }, [theme]);

  return (
    <nav className="nav-bar">
      <div className="w-full h-full font-bold px-3 py-0-5 rounded-md flex-row flex-justify-between flex-align-center flex-wrap">
        <div className="flex-row flex-justify-between flex-align-center flex-gap-1">
          <div className="flex-row flex-justify-center flex-align-center flex-gap-2">
            {/* Brand Logo */}
            <Link to="/">
              <img
                className="nav-logo rounded-circle"
                src={petflixLogoDark}
                alt="Logo"
                width={60}
                height={60}
              />
            </Link>
            {/* Brand Title */}
            <h1 className="nav-logo-title h1 font-xbold">
              <Link to="/" className="btn color-primary">
                Petflix
              </Link>
            </h1>
          </div>
        </div>
        {/* search bar */}
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {/* Icons and Buttons */}
        <div className="nav-actions-container flex-row flex-justify-between flex-align-center gap-2">
          <NavLink to="/home" className={getActiveStyles}>
            <span className="h4 font-bold">Home</span>{" "}
            <i className="fa-solid fa-house" />
          </NavLink>
          <NavLink to="/explore" className={getActiveStyles}>
            <span className="h4 font-bold">Explore</span>{" "}
            <i className="fa-solid fa-compass" />
          </NavLink>
          <button
            className={`btn relative mx-0-5 my-1 w-max h-max ${
              false ? "active-link" : ""
            }`}
            onClick={handleThemeChange}
          >
            <i className="fa-solid fa-sun fa-xl" />
          </button>
          {isAuth ? (
            <Logout iconButton />
          ) : (
            <NavLink
              to="/login"
              className={`btn relative mx-0-5 my-1 w-max h-max ${
                pathname === "/sign-up" || pathname === "/login"
                  ? "active-link"
                  : ""
              }`}
            >
              <i className="fa-solid fa-user fa-xl" />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
