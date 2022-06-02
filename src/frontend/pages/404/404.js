import "./404.css";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound_container">
      <h1 className="heading_404">404</h1>
      <h3 className="sub_heading_404">oops! Page not found</h3>
      <p className="content_404">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <button onClick={() => navigate("/")} className="return_home">
        Return Home
      </button>
    </div>
  );
}
