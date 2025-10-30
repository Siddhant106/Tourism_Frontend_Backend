// src/pages/Auth.jsx
// 🔥 FIXED - Proper default export

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

// ✅ Make sure these components exist, if not - comment them out for now
// import { useToast, ToastContainer } from '../components/Toast';
// import DemoCredentials from '../components/DemoCredentials';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        payload
      );

      if (response.data.success) {
        // Save token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        alert(isLogin ? '✅ Login successful!' : '✅ Account created!');

        // Redirect to home
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Something went wrong';
      alert('❌ ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? '👋 Welcome Back!' : '🎉 Create Account'}</h1>
          <p>
            {isLogin 
              ? 'Login to share your travel experiences'
              : 'Join us and start exploring India'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? '⏳ Please wait...' : (isLogin ? '🔐 Login' : '✨ Sign Up')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="toggle-btn"
              disabled={loading}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        {/* Demo Credentials - Simple version without component */}
        {isLogin && (
          <div className="demo-box">
            <h4>🎭 Test Credentials</h4>
            <div className="demo-creds">
              <p><strong>Email:</strong> rahul@test.com</p>
              <p><strong>Password:</strong> test123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ CRITICAL: Default export
export default Auth;