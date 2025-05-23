// src/components/About.jsx
import React from 'react';
import '../styles.css'; // Make sure styling is applied

function About() {
  return (
    <div className="about-container">
      <h1>About StreamList</h1>
      <p>
        StreamList is your personalized entertainment hub where you can manage subscriptions, browse movies, and explore our latest accessories.
      </p>
      <p>
        Built with React, StreamList offers a modern, user-friendly experience backed by powerful APIs and persistent local storage to keep your data safe and available.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>Search for movies using TMDB API</li>
        <li>Maintain a task-style watchlist</li>
        <li>Subscribe to EZTech plans and order branded accessories</li>
        <li>Responsive and interactive user interface</li>
      </ul>
    </div>
  );
}

export default About;
