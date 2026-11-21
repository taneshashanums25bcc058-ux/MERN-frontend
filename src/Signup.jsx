
import React, { useState } from "react";
import "./Signup.css";

function Signup({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      setMessageType("error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      setMessage(data.message);
      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        if (onLogin) onLogin();
      }, 1500);

    } catch (error) {
      setMessage(error.message || "Unable to connect to backend.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">

        <div className="signup-left">
          <div className="signup-logo">🧸 TOYLAND</div>
          <div className="signup-illustration">🎁 🎈 🚀</div>

          <h1>Join Our Happy Toy Family!</h1>

          <p>
            Create your account and discover a colourful
            world of toys, surprises and endless fun.
          </p>

          <div className="signup-decoration">
            ⭐ 🧩 🧸 🎨
          </div>
        </div>

        <div className="signup-right">

          <div className="signup-heading">
            <span>WELCOME TO TOYLAND</span>
            <h2>Create Account</h2>
            <p>Sign up to start your shopping adventure.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="signup-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="signup-field">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="signup-terms">
              <input type="checkbox" required />
              <span>
                I agree to the Terms and Conditions
                and Privacy Policy.
              </span>
            </label>

            {message && (
              <div className={`signup-message ${messageType}`}>
                {message}
              </div>
            )}

            <button
              className="signup-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "CREATING ACCOUNT..."
                : "CREATE MY ACCOUNT 🎁"}
            </button>

          </form>

          <p className="signup-login">
            Already have an account?
            <button type="button" onClick={onLogin}>
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
