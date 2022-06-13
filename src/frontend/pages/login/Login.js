import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import {useState} from "react"
import axios from "axios";
import "./login.css";

export function Login() {
  const { authState, authDispatch } = useAuth();
  const { user, error } = authState;
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function loginHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", response.data.encodedToken);

      authDispatch({ type: "TOKEN", payload: response.data.encodedToken });
      navigate("navigate(location.state.from.pathname, { replace: true })");

      authDispatch({ type: "ERROR", payload: response.data.encodedToken });
      navigate('${location?.state?.from?.pathname}', { replace: true } );
    } catch (error) {
      authDispatch({
        type: "ERROR",
        payload: "Wrong credentials, please try again",
      });
      console.log(error);
    }
  };


  async function guestHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email: "parulgupta@gmail.com",
        password: "parul1234",
      });
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: response.data.encodedToken });
      navigate(location.state.from.pathname, { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form  onSubmit={flag ? loginHandler : guestHandler}className="login_container">
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
        <button className="login_btn" type="submit" onClick={() => setFlag(true)}>
          LOGIN
        </button>
        <button className="guest_login_btn" type="submit" onClick={() => setFlag(false)}>
          Login As Guest
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
