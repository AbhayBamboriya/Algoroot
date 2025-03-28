import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Username validation (only for signup)
    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate authentication
        localStorage.setItem('user', JSON.stringify({
            email: formData.email,
            username: formData.username,
            isAuthenticated: true
        }));
        // 
        setIsAuthenticated(true);
        const r=alert('Authentication Successful!');
        console.log('r',r);
        
        navigate("/details");
        
    }
  };

  // Render authentication or dashboard based on state
  if (isAuthenticated) {
    return (
      <div className="home-page">
        <div className="auth-container">
          <h2>Welcome, {formData.username || formData.email}!</h2>
          <button 
            onClick={() => {
              localStorage.removeItem('user');
              setIsAuthenticated(false);
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-form">
          <p>
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="toggle-btn"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;