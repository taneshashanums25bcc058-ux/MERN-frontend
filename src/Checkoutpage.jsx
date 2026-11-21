
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkoutpage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    house: "",
    city: "",
    pincode: ""
  });

  useEffect(() => {
    const user = localStorage.getItem("toylandUser");

    if (!user) {
      alert("Please login before checkout.");
      navigate("/login");
      return;
    }

    const savedCart = JSON.parse(
      localStorage.getItem("toylandCart") || "[]"
    );

    setCart(savedCart);
  }, [navigate]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 399 ? 0 : 50;
  const codCharge = payment === "COD" ? 40 : 0;
  const total = subtotal + delivery + codCharge;

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const user = JSON.parse(
        localStorage.getItem("toylandUser")
      );

      const userId = user?._id || user?.id;

      if (!userId) {
        setMessage("User ID not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            items: cart,
            address,
            payment
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed.");
      }

      const savedOrder = {
        ...data.order,
        date: data.order.createdAt
          ? new Date(data.order.createdAt).toLocaleString()
          : new Date().toLocaleString()
      };

      localStorage.setItem(
        "toylandLastOrder",
        JSON.stringify(savedOrder)
      );

      localStorage.removeItem("toylandCart");

      navigate("/order-success");

    } catch (error) {
      setMessage(error.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h1>Your cart is empty 🛒</h1>
        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Checkout 🛍️</h1>

      <div style={styles.layout}>
        <form onSubmit={handleOrder} style={styles.card}>
          <h2>Delivery Details</h2>

          <input
            name="name"
            placeholder="Full Name"
            required
            value={address.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            type="tel"
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
            required
            value={address.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email Address"
            type="email"
            required
            value={address.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="house"
            placeholder="House No. / Street Address"
            required
            value={address.house}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="city"
            placeholder="City"
            required
            value={address.city}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="pincode"
            placeholder="PIN Code"
            pattern="[0-9]{6}"
            title="Enter a 6-digit PIN code"
            required
            value={address.pincode}
            onChange={handleChange}
            style={styles.input}
          />

          <h2>Payment Method</h2>

          {["UPI", "Card", "COD"].map((method) => (
            <label key={method} style={styles.payment}>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={payment === method}
                onChange={(e) => setPayment(e.target.value)}
              />
              {method === "COD"
                ? "Cash on Delivery (+₹40)"
                : method}
            </label>
          ))}

          {message && (
            <p style={{ color: "red" }}>{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Placing Order..." : `Place Order – ₹${total}`}
          </button>

          <p style={styles.note}>
            Demo checkout only. No real payment is collected.
          </p>
        </form>

        <div style={styles.card}>
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
              <span style={{ float: "right" }}>
                ₹{item.price * item.quantity}
              </span>
            </p>
          ))}

          <hr />
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: {delivery === 0 ? "FREE" : `₹${delivery}`}</p>
          <p>COD charge: ₹{codCharge}</p>
          <hr />
          <h2>Total: ₹{total}</h2>

          <p style={{ color: "green" }}>
            {delivery === 0
              ? "Congratulations! Free delivery applied."
              : "Shop above ₹399 for free delivery."}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif"
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },
  card: {
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  payment: {
    display: "block",
    padding: "10px 0"
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "#ff6384",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  note: {
    fontSize: "12px",
    color: "#777"
  }
};

export default Checkoutpage;
