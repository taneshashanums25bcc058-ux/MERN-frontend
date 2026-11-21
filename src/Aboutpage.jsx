
import React from "react";
import { Link } from "react-router-dom";

function Aboutpage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>🧸 TOYLAND</Link>
        <Link to="/" style={styles.home}>Back to Home</Link>
      </header>

      <section style={styles.hero}>
        <h1>About TOYLAND 💖</h1>
        <p>Where happiness comes in little boxes!</p>
      </section>

      <section style={styles.content}>
        <h2>Our Story</h2>
        <p>
          TOYLAND is an online toy shopping destination created to bring
          happiness, creativity and excitement to children and families.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to make toy shopping simple, enjoyable and affordable
          while helping children discover, learn and imagine.
        </p>

        <h2>Why Choose TOYLAND?</h2>
        <ul>
          <li>Wide variety of toys</li>
          <li>Affordable prices</li>
          <li>Exciting offers and discounts</li>
          <li>Convenient online shopping</li>
          <li>A fun shopping experience</li>
        </ul>

        <Link to="/signup" style={styles.button}>Start Shopping</Link>
      </section>

      <footer style={styles.footer}>
        © 2026 TOYLAND. Made with 💖
      </footer>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", fontFamily: "Arial, sans-serif" },
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "20px 6%"
  },
  logo: { color: "#ff6384", fontSize: "25px", fontWeight: "bold" },
  home: { color: "#ff6384", fontWeight: "bold" },
  hero: {
    textAlign: "center", padding: "65px 20px",
    background: "linear-gradient(135deg, #ffe1e9, #fff0d5)"
  },
  content: {
    maxWidth: "750px", margin: "auto",
    padding: "45px 25px", lineHeight: 1.8
  },
  button: {
    display: "inline-block", marginTop: "25px",
    padding: "12px 25px", background: "#ff6384",
    color: "white", borderRadius: "10px"
  },
  footer: {
    textAlign: "center", padding: "25px",
    background: "#fff0e7"
  }
};

export default Aboutpage;

