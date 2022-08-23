import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useState } from "react";
import axios from "axios";
import "./login.css";
import { toast } from "react-toastify";

export function Login() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({ email: "", password: "" });
  const location = useLocation();

  async function loginHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, detail);
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: response.data.encodedToken });
      toast.success("Login Successful");
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(`${err.response.status} Error. Please try again!`);
    }
  }

  return (
    <div className="login_page">
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
              required
              type="email"
              value={detail.email}
              className="email_input user_input"
              onChange={(e) => setDetail({ ...detail, email: e.target.value })}
            />
          </div>
        </div>
        <div className="input password_label">
          <div>
            <label htmlFor="password" className="input_password_label">
              Password
            </label>
          </div>
          <div>
            <input
              required
              type="password"
              value={detail.password}
              className="password_input user_input"
              onChange={(e) =>
                setDetail({ ...detail, password: e.target.value })
              }
            />
            <div className="forgot_password"> Forgot Password?</div>
          </div>
        </div>
        <button className="login_btn" type="submit">
          LOGIN
        </button>
        <button
          className="guest_login_btn"
          type="submit"
          onClick={() => {
            setDetail({
              ...detail,
              email: "parulgupta@gmail.com",
              password: "parul1234",
            });
          }}
        >
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
    </div>
  );
}
