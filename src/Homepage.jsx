
import React from "react";
import { Link } from "react-router-dom";

const toys = [
  { id: 1, name: "Teddy Bear", category: "Soft Toys", price: 499, emoji: "🧸" },
  { id: 2, name: "Toy Car", category: "Vehicles", price: 299, emoji: "🚗" },
  { id: 3, name: "Building Blocks", category: "Learning Toys", price: 599, emoji: "🧱" },
  { id: 4, name: "Cute Doll", category: "Dolls", price: 399, emoji: "👸" },
  { id: 5, name: "Toy Robot", category: "Electronic Toys", price: 699, emoji: "🤖" },
  { id: 6, name: "Rainbow Ball", category: "Outdoor Toys", price: 199, emoji: "🏀" }
];

function Homepage() {
  const addToCart = (toy) => {
    const cart = JSON.parse(
      localStorage.getItem("toylandCart") || "[]"
    );

    const existingItem = cart.find(
      (item) => item.id === toy.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...toy,
        quantity: 1
      });
    }

    localStorage.setItem("toylandCart", JSON.stringify(cart));

    alert(`${toy.name} added to your cart!`);
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>🧸 TOYLAND</h2>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact Us</Link>
          <Link to="/cart" style={styles.link}>🛒 Cart</Link>
          <Link to="/signup" style={styles.link}>Signup</Link>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </nav>

      <section style={styles.banner}>
        <h1>Welcome to TOYLAND! 🎉</h1>
        <h2>Where Every Toy Brings a Smile</h2>
        <p>Discover happiness, creativity and fun for every child.</p>
        <Link to="/cart" style={styles.bannerButton}>
          Explore Your Cart
        </Link>
      </section>

      <section style={styles.products}>
        <h1 style={styles.heading}>Our Popular Toys</h1>

        <div style={styles.grid}>
          {toys.map((toy) => (
            <div key={toy.id} style={styles.card}>
              <div style={styles.emoji}>{toy.emoji}</div>
              <h3>{toy.name}</h3>
              <p>{toy.category}</p>
              <h3>₹{toy.price}</h3>

              <button
                style={styles.button}
                onClick={() => addToCart(toy)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <h2>TOYLAND 🧸</h2>
        <p>Making childhood more colourful, one toy at a time!</p>
        <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
        <p>© 2026 TOYLAND. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#fffaf5",
    minHeight: "100vh"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "15px 5%",
    background: "white",
    boxShadow: "0 2px 8px #ddd"
  },
  logo: {
    color: "#ff6384",
    margin: "10px"
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold"
  },
  banner: {
    textAlign: "center",
    padding: "65px 20px",
    background: "#ffe1e8",
    color: "#633344"
  },
  bannerButton: {
    display: "inline-block",
    background: "#ff6384",
    color: "white",
    padding: "12px 25px",
    borderRadius: "8px",
    textDecoration: "none",
    marginTop: "15px"
  },
  products: {
    padding: "35px 5%"
  },
  heading: {
    textAlign: "center",
    marginBottom: "35px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px"
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 3px 12px #ddd"
  },
  emoji: {
    fontSize: "65px",
    margin: "10px"
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "#ff6384",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px"
  },
  footer: {
    textAlign: "center",
    padding: "30px",
    background: "#ffe1e8",
    marginTop: "30px"
  },
  footerLink: {
    color: "#b83257"
  }
};

export default Homepage;
