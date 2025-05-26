import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

function Login({ onLoginSuccess }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to StreamList</h2>
        <p>Please log in to continue</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            onLoginSuccess();
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
}

export default Login;
