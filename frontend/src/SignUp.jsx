import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSignup(e) {

    e.preventDefault();


    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {

      alert("Please fill all fields");
      return;

    }


    try {

      const response = await fetch(
        "http://localhost:5000/api/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();


      if (response.ok) {

        alert("Signup successful!");

        setName("");
        setEmail("");
        setPassword("");

        navigate("/login");

      } else {

        alert(data.message);

      }


    } catch (error) {

      console.log(error);

      alert(
        "Server error. Please make sure backend is running."
      );

    }

  }


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Book Library</h1>

        <p>Create your account</p>


        <form onSubmit={handleSignup}>

          <label>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <button type="submit">
            Sign Up
          </button>

        </form>


        <p className="auth-link">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </div>

    </div>

  );
}


export default Signup;