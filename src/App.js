import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import './App.css';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Subscriptions from './components/Subscriptions';
import Login from './components/Login';

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addToCart = (item) => {
    const isSubscription = item.type === 'subscription';
    const alreadyInCart = cart.find(p => p.id === item.id);
    if (isSubscription && cart.some(p => p.type === 'subscription')) {
      alert('Only one subscription can be added.');
      return;
    }
    if (alreadyInCart) {
      setCart(cart.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id));
  const updateQuantity = (id, amount) => setCart(cart.map(p => p.id === id ? { ...p, quantity: amount } : p));

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      {isAuthenticated && (
        <nav>
          <Link to="/">StreamList</Link> | 
          <Link to="/movies">Movies</Link> | 
          <Link to="/subscriptions">Subscriptions</Link> | 
          <Link to="/cart">Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</Link> | 
          <Link to="/about">About</Link>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          <>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/subscriptions" element={<Subscriptions addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/about" element={<About />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
