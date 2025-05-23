import './styles.css';
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Subscriptions from './components/Subscriptions';

function App() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        if (item.type === 'subscription') amount = 1; // lock quantity
        return { ...item, quantity: amount };
      }
      return item;
    }));
  };

  return (
    <Router>
      <nav>
        <Link to="/">StreamList</Link> | 
        <Link to="/movies">Movies</Link> | 
        <Link to="/subscriptions">Subscriptions</Link> | 
        <Link to="/cart">Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</Link> | 
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/subscriptions" element={<Subscriptions addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
