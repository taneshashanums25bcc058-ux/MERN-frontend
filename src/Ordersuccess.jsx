
import React from "react";
import { Link } from "react-router-dom";

function Ordersuccess() {
  const order = JSON.parse(
    localStorage.getItem("toylandLastOrder") || "null"
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping with TOYLAND!</p>

        {order && (
          <>
            <h3>Order Summary</h3>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
              </p>
            ))}

            <h2>Total Paid: ₹{order.total}</h2>
            <p>Payment Method: {order.payment}</p>
            <p>Order Date: {order.date}</p>
          </>
        )}

        <p>Your order has been received successfully.</p>

        <Link to="/" style={styles.button}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff0f3",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 4px 15px #ddd"
  },
  icon: {
    fontSize: "65px"
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "13px 25px",
    background: "#ff6384",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px"
  }
};

export default Ordersuccess;

