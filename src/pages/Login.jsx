import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [logininfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...logininfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    if (!email || !password) {
      return handleError("All field must be required");
    }
    try {
      const url = "https://mernback-l2q3.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("Token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const detail = error?.details[0].message;
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              autoFocus
              placeholder="Enter Your Email..."
              value={logininfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              autoFocus
              placeholder="Enter Your Password..."
              value={logininfo.password}
            />
          </div>
          <button type="submit">SignUp</button>
          <span>
            Don't have an account<Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
