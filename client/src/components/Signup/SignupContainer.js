import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupContainer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic client-side validation
    if (!firstName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://task-manager-nfd8.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://task-manager-nfd8.onrender.com/auth/google";
  };

  return (
    <div className="_login_container_">
      <h1>Signup</h1>
      <div className="login-container__">
        <form onSubmit={handleSignup}>
          <div className="login__">
            <input
              type="text"
              id="fName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              id="lName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button className="btn-login__" type="submit">
              Signup
            </button>
          </div>
        </form>
        <div className="signup__">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
        <button className="btn-google" onClick={handleGoogleSignup}>
          Signup with Google
        </button>
      </div>
    </div>
  );
}

export default SignupContainer;
