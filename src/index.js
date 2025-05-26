// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="313382167143-dt0bgak8m67qrblsnbmkp871t58ep4r0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
