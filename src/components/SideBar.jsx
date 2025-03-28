import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{
        backgroundColor: '#121212', 
        color: '#ffffff' 
      }}>

      <div className="theme-toggle-container">
        <label className="theme-toggle-switch">
          <input 
            type="checkbox" 
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <span className="theme-toggle-slider">
            {isDarkMode ? <Moon className="theme-icon moon" /> : <Sun className="theme-icon sun" />}
          </span>
        </label>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-toggle"
      >
        {isOpen ? <X className="icon" /> : <Menu className="icon" />}
      </button>

      {/* Expand/Collapse Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="expand-toggle"
      >
        {isExpanded ? <ChevronsLeft className="expand-icon" /> : <ChevronsRight className="expand-icon" />}
      </button>

      {/* Sidebar */}
      <div className={`
        sidebar 
        ${isOpen ? 'sidebar-open' : 'sidebar-closed'}
        ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}
        ${isDarkMode ? 'dark-mode-sidebar' : 'light-mode-sidebar'}
      `}>
        <div className="sidebar-content">
          <h2 className={`sidebar-title ${!isExpanded ? 'hidden' : ''}`}>
            {isExpanded ? 'Details' : ''}
          </h2>
          <nav>
            <ul className="sidebar-nav">
              <li>
                <a 
                  href="#" 
                  className="sidebar-link"
                >
                  <span className={!isExpanded ? 'hidden' : ''}>Details Page</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;