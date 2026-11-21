import React, { useState } from "react";

function Contactpage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thank you! Your message has been received.");
    e.target.reset();
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Contact the TOYLAND team.</p>

      <form onSubmit={handleSubmit}>
        <input placeholder="Your Name" required style={inputStyle} />
        <input type="email" placeholder="Your Email" required style={inputStyle} />
        <input placeholder="Subject" required style={inputStyle} />
        <textarea placeholder="Your Message" required style={inputStyle} />

        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  margin: "12px 0",
  boxSizing: "border-box"
};

const buttonStyle = {
  padding: "12px 24px",
  background: "#ff6b81",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Contactpage;