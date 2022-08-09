import { FaCaretDown } from "react-icons/fa";
import { GoPlay } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike, AiFillHome } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { BsFillFilePlayFill, BsFillPlayFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/data-context";
import { toast } from "react-toastify";
import axios from "axios";
import "./navbar.css";

export function Navbar() {
  const navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const { dataDispatch } = useData();
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState(false);
  const [drawerCategory, setDrawerCategory] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/categories");
      setCategories(response.data.categories);
    })();
  }, []);

  const logoutHandler = () => {
    authDispatch({ type: "TOKEN", payload: null });
    localStorage.removeItem("token");
    toast.success("Logout Successful");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="navigation_container">
      <div className="nav_top">
        <div className="drawer">
          <GiHamburgerMenu onClick={() => setMenu((prev) => !prev)} />
        </div>
        {menu && (
          <ul className="drawer_menu">
            <li className="drawer_menu_option">
              <AiFillHome className="drawer_icon" />
              <Link
                to="/"
                className="drawer_option"
                onClick={() => dataDispatch({ type: "RESET" })}
              >
                Home
              </Link>
            </li>
            <li className="drawer_menu_option">
              <BiHistory className="drawer_icon" />
              <Link to="/history" className="drawer_option">
                History
              </Link>
            </li>
            <li className="drawer_menu_option">
              <AiOutlineLike className="drawer_icon" />
              <Link to="/liked" className="drawer_option">
                Liked
              </Link>
            </li>
            <li className="drawer_menu_option">
              <MdOutlineWatchLater className="drawer_icon" />
              <Link to="/watchLater" className="drawer_option">
                Watch Later
              </Link>
            </li>
            <li className="drawer_menu_option">
              <GoPlay className="drawer_icon" />
              <Link to="/playlist" className="drawer_option">
                Playlist
              </Link>
            </li>
            <li
              className="drawer_menu_option"
              onClick={() => setDrawerCategory((prev) => !prev)}
            >
              {!drawerCategory && <BsFillPlayFill className="drawer_icon" />}
              {drawerCategory && <FaCaretDown className="drawer_icon" />}
              <span className="drawer_option">Categories</span>
            </li>
            {drawerCategory &&
              categories.map((category) => (
                <li
                  className="category_drawer_option"
                  value={category.categoryName}
                  onClick={(e) => {
                    navigate("/");
                    e.target.innerText &&
                      dataDispatch({
                        type: "CATEGORY",
                        payload: e.target.innerText,
                      });
                  }}
                  key={category._id}
                >
                  <BsFillFilePlayFill className="category_drawer_icon" />
                  <span className="category_option">
                    {category.categoryName}
                  </span>
                </li>
              ))}
          </ul>
        )}

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
              className="nav_option"
              onClick={() => dataDispatch({ type: "RESET" })}
            >
              Home
            </Link>

            <Link to="/history" className="nav_option">
              History
            </Link>

            <Link to="/liked" className="nav_option">
              Liked
            </Link>

            <Link to="/playlist" className="nav_option">
              PlayList
            </Link>

            <Link to="/watchLater" className="nav_option">
              Watch Later
            </Link>

            <div className="nav_dropdown">
              <button className="nav_button nav_option">
                Categories
                <FaCaretDown />
              </button>
              <div className="dropdown_content">
                {categories.map((category) => (
                  <option
                    className="dropdown_content_option"
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
      </div>

      <div className="search_bar">
        <div className="nav_search">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) =>
              dataDispatch({ type: "SEARCH", payload: e.target.value })
            }
          />
        </div>

        {token ? (
          <button className="logout_button" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <button className="login_button" onClick={loginHandler}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
