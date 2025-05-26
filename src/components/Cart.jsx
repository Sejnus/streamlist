// src/components/Cart.jsx
import React, { useState } from 'react';
import './Cart.css'; // Ensure this file exists or remove if not using CSS

function Cart({ cart, removeFromCart, updateQuantity }) {
  const [cardNumber, setCardNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCardNumber = (input) => {
    return input
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  const handleCheckout = () => {
    if (cardNumber.length < 19) {
      alert('Please enter a valid 16-digit card number.');
      return;
    }

    localStorage.setItem('cardInfo', JSON.stringify({ cardNumber }));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="cart-container">
        <h2>Thank you for your purchase!</h2>
        <p>Your card ending in {cardNumber.slice(-4)} has been charged ${total.toFixed(2)}.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <div className="cart-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  />
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
          </div>

          <div className="checkout-section">
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />
            <button onClick={handleCheckout}>Submit Payment</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
