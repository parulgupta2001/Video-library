import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export function Login() {
  const { authState, authDispatch } = useAuth();
  const { user, error } = authState;
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = () => {
    try {
      const response = axios.post(`/api/auth/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({ type: "ERROR", payload: response.data.encodedToken });
      navigate("navigate(location.state.from.pathname, { replace: true })");
    } catch (error) {
      authDispatch({
        type: "ERROR",
        payload: "Wrong credentials, please try again",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={loginHandler} className="login_container">
        <h3>LOGIN</h3>
        <div className="input email_label">
          <div>
            <label htmlFor="name" className="input_email_label">
              Email
            </label>
          </div>
          <div>
            <input
              type="email"
              className="email_input user_input"
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div class="input password_label">
          <div>
            <label htmlFor="password" className="input_password_label">
              Password
            </label>
          </div>
          <div>
            <input
              type="password"
              className="password_input user_input"
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
            <div className="forgot_password"> Forgot Password?</div>
          </div>
        </div>
        <button className="login_btn" type="submit">
          LOGIN
        </button>
        <div className="option">
          <div>----------------------OR----------------------</div>
          <div className="need_account">
            Need an account?
            <Link to="/signup" className="signup_link">
              Signup
            </Link>
          </div>
        </div>
      </form>
      <div className="error_msg">{error}</div>
    </div>
  );
}
