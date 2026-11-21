import React, { useState } from "react";

function Cartpage() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("toylandCart")) || []
  );

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("toylandCart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Shopping Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "20px" }}>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
          <button onClick={() => window.location.href = "/checkout"}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cartpage;