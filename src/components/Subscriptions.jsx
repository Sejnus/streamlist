import React from 'react';
import products from '../Data';
import '../styles.css'; // This makes sure your CSS is loaded!

function Subscriptions({ addToCart }) {
  return (
    <div className="subscriptions-container">
      <h2>Available Subscriptions and Accessories</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
