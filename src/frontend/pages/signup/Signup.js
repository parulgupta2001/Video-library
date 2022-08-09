import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./signup.css";

export function Signup() {
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [dummy, setDummy] = useState(false);

  async function signupHandler(e) {
    e.preventDefault();
    try {
      let response;
      dummy
        ? (response = await axios.post("/api/auth/login", detail))
        : (response = await axios.post("/api/auth/signup", detail));
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: response.data.encodedToken });
      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      toast.error(`${err.response.status} Error. Please try again!`);
    }
  }

  return (
    <div className="signup">
      <form onSubmit={signupHandler} className="signup_container">
        <h3>SIGN-UP</h3>
        <div className="input_name_label">
          <div>
            <label className="first_name_label first_name">First name</label>
            <input
              required
              type="text"
              value={detail.firstName}
              className="name_input first_name"
              onChange={(e) =>
                setDetail({ ...detail, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="last_name_label last_name">Last name</label>
            <input
              required
              type="text"
              value={detail.lastName}
              className="name_input last_name"
              onChange={(e) =>
                setDetail({ ...detail, lastName: e.target.value })
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
          </div>
        </div>

        <button className="signup_btn" type="submit">
          Create New Account
        </button>
        <button
          className="demo_signup_btn"
          onClick={() => {
            {
              setDummy(true);

              setDetail({
                ...detail,
                firstName: "Parul",
                lastName: "Gupta",
                email: "parulgupta@gmail.com",
                password: "parul1234",
              });
            }
          }}
        >
          Dummy Signup
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
