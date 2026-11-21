
import React, { useState } from "react";

function Login({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      setMessage("Login successful! Welcome back.");

      // Keep only non-sensitive login information.
      if (data.user) {
        localStorage.setItem("toylandUser", JSON.stringify(data.user));
      }

      setTimeout(() => {
        if (onLogin) onLogin();
      }, 1000);

    } catch (error) {
      setMessage(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Welcome Back! 🧸</h1>
        <p>Login to your TOYLAND account</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p style={{
            color: message.includes("successful") ? "green" : "red",
            fontWeight: "bold",
          }}>
            {message}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <span onClick={onSignup} style={styles.link}>
            Sign Up
          </span>
        </p>

        <span onClick={onLogin} style={styles.link}>
          Back to Home
        </span>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff4e6",
    padding: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    background: "white",
    padding: "35px",
    borderRadius: "18px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
  },
  link: {
    color: "#ff6584",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
