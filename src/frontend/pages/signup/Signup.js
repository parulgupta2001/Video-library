import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import axios from "axios";
import "./signup.css";

export function Signup() {
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const { user } = authState;

  async function signupHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      // saving the encodedToken in the localStorage
      console.log(response.data.encodedToken);
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: response.data.encodedToken });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={signupHandler} className="signup_container">
        <h3>SIGN-UP</h3>
        <div className="input_name_label">
          <div>
            <label className="first_name_label first_name">First name</label>
            <input
              required
              type="text"
              className="name_input first_name"
              onChange={(e) =>
                authDispatch({ type: "FIRST_NAME", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label className="last_name_label last_name">Last name</label>
            <input
              required
              type="text"
              className="name_input last_name"
              onChange={(e) =>
                authDispatch({ type: "LAST_NAME", payload: e.target.value })
              }
            />
          </div>
        </div>
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
              className="email_input user_input"
              onChange={(e) =>
                authDispatch({ type: "EMAIL", payload: e.target.value })
              }
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
              className="password_input user_input"
              onChange={(e) =>
                authDispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="input password_label">
          <div>
            <label className="confirm_password_label">Confirm Password</label>
          </div>
          <div>
            <input
              required
              type="password"
              className="password_input user_input"
              onChange={(e) =>
                authDispatch({
                  type: "CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button className="signup_btn" type="submit">
          Create New Account
        </button>
        <div className="option">
          <div>----------------------OR----------------------</div>
          <div className="exist_account">
            Already an account?
            <Link to="/login" className="login_link">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
