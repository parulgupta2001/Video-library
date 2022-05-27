import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import "./navbar.css";
import "../../../App.css";

export function Navbar() {
  return (
    <div className="navigation_container">
      <div className="links">
        <Link className="navLogo" to="/">
          Morning VIBES
        </Link>

        <div className="nav_link_container">
          <Link to="/" className="nav_link">
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
              <Link to="./all" className="dropdown_link">
                All
              </Link>
              <Link to="./motivational" className="dropdown_link">
                Motivational Songs
              </Link>
              <Link to="./devotional" className="dropdown_link">
                Devotional Songs
              </Link>
              <Link to="./meditation" className="dropdown_link">
                Meditation Songs
              </Link>
              <Link to="./exercise" className="dropdown_link">
                Exercise Videos
              </Link>
              <Link to="./yoga" className="dropdown_link">
                Yoga Videos
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="search_bar">
        <div className="nav_search">
          <input placeholder="Search" />
          <AiOutlineSearch />
        </div>
        <div className="login">Login</div>
      </div>
    </div>
  );
}
