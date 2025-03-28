import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../content/AuthContext';

const HomePage = () => {

    const {login}=useAuth()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('registeredUsers');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.isLoggedIn) {
        setIsAuthenticated(true);
        navigate("/details");
      }
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    // Retrieve existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if email already exists
    const userExists = existingUsers.some(user => user.email === formData.email);
    
    if (userExists) {
      setErrors({
        email: 'Email already registered. Please login or use a different email.'
      });
      return;
    }

    // Create new user object
    const newUser = {
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      password: formData.password, // Note: In a real app, you'd hash this
      registeredAt: new Date().toISOString()
    };

    // Add new user to existing users
    const updatedUsers = [...existingUsers, newUser];
    
    // Save to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // Optional: Auto-login after registration
    handleLogin();
  };

  const handleLogin = () => {
  // Retrieve registered users
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//   navigate('/details');
  
  // Find user by email and password
  const user = registeredUsers.find(
    u => u.email === formData.email && u.password === formData.password
  );
  
  if (user) {
    // Create a logged-in user object
    const loggedInUser = {
      ...user,
      isLoggedIn: true,
      lastLoginAt: new Date().toISOString()
    };

    
    // Update localStorage with logged-in status
    const updatedUsers = registeredUsers.map(u => 
      u.email === user.email ? loggedInUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    window.location.href = '/details';
    login(user)
    // Explicitly set authentication state
    setIsAuthenticated(true);

    <Navigate to={'/details'}/>
    // Navigate to details page
    // navigate('/details');
  } else {
    // Invalid credentials
    setErrors({
      email: 'Invalid email or password',
      password: 'Invalid email or password'
    });
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isLogin) {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleLogout = () => {
    // Retrieve registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Update logged-in status
    const updatedUsers = registeredUsers.map(u => ({
      ...u, 
      isLoggedIn: false
    }));
    
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // Reset states
    setIsAuthenticated(false);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
    // <Navigate to={}
    navigate("/");
  };

  // Early return for authenticated state
  if (isAuthenticated) {
    return null; // Prevents render while navigating
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