import { AiOutlineSearch } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/data-context";
import axios from "axios";
import "./navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const { dataDispatch } = useData();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/categories");
      setCategories(response.data.categories);
    })();
  }, []);

  function logoutHandler(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    authDispatch({ type: "TOKEN", payload: null });
    navigate("/");
  }

  function loginHandler() {
    navigate("/login");
  }

  return (
    <div className="navigation_container">
      <div className="links">
        <Link
          className="navLogo"
          to="/"
          onClick={() => dataDispatch({ type: "RESET" })}
        >
          Morning VIBES
        </Link>

        <div className="nav_link_container">
          <Link
            to="/"
            className="nav_link"
            onClick={() => dataDispatch({ type: "RESET" })}
          >
            Home
          </Link>

          <Link to="/history" className="nav_link">
            History
          </Link>

          <Link to="/liked" className="nav_link">
            Liked
          </Link>

          <Link to="/playlist" className="nav_link">
            PlayList
          </Link>

          <Link to="/watchLater" className="nav_link">
            Watch Later
          </Link>

          <div className="nav_dropdown">
            <button className="nav_button">
              Categories
              <FaCaretDown />
            </button>
            <div className="dropdown_content">
              {categories.map((category) => (
                <option
                  onClick={(e) => {
                    navigate("/");
                    e.target.innerText &&
                      dataDispatch({
                        type: "CATEGORY",
                        payload: e.target.value,
                      });
                  }}
                >
                  {category.categoryName}
                </option>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="search_bar">
        <div className="nav_search">
          <input
            placeholder="Search"
            onChange={(e) =>
              dataDispatch({ type: "SEARCH", payload: e.target.value })
            }
          />
        </div>

        {token ? (
          <button className="logout" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <button className="login" onClick={loginHandler}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
