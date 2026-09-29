import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleAdminLogin(e) {

    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      localStorage.setItem("isAdmin", "true");

      alert("Admin Login Successful!");

      navigate("/admin");

    } else {

      alert("Invalid Admin Email or Password");

    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Admin Login</h1>

        <p>Login to manage the library</p>

        <form onSubmit={handleAdminLogin}>

          <label>Admin Email</label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Admin Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;