import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import './NavBar.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../content/AuthContext';

const Navbar = ({ user, email, onLogout }) => {
    const { logout,deleteAccount} = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
 

    const handleLogout = () => {
            navigate("/");
      };

    const ondeleteAccount = () => {
        console.log('email in delete',email);
        
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
        // Filter out the current user's email
        const updatedUsers = registeredUsers.filter(
          user => user.email !== email
        );
        
        // Update localStorage with the filtered users
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        // Clear current user's local data
        localStorage.removeItem('user');
        
        // Navigate back to home page
        Promise.resolve().then(() => {
          navigate("/");
        });
    };
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* User Profile Dropdown */}
                <div className="user-profile-dropdown">
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="user-profile-button"
                    >
                        <User className="h-6 w-6" />
                    </button>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <p className="dropdown-username">
                                    {user?.name || 'User'}
                                </p>
                                <p className="dropdown-email">
                                    {email}
                                </p>
                            </div>
                            <div className="dropdown-actions">
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setDropdownOpen(false);
                                    }}
                                    className="dropdown-action-button logout-button"
                                >
                                    <div className="dropdown-action-content">
                                        <LogOut className="dropdown-action-icon" />
                                        <span className="dropdown-action-text">Logout</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        ondeleteAccount();
                                        setDropdownOpen(false);
                                    }}
                                    className="dropdown-action-button delete-button"
                                >
                                    <div className="dropdown-action-content">
                                        <User className="dropdown-action-icon" />
                                        <span className="dropdown-action-text">Delete Account</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;