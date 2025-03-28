import React from 'react';
import './DetailPage.css'
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Navbar from '../components/NavBar';
import { useAuth } from '../content/AuthContext';
import Sidebar from '../components/SideBar';

const   DetailsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="details-page">
      <Navbar 
        username={user.username} 
        email={user.email}
        onLogout={handleLogout} 
      />
      <div className="content-wrapper">
        <Sidebar/>
        <main className="main-content">
            {/* <Sidebar */}
            
          <DataTable />
        </main>
      </div>
    </div>
  );
};

export default DetailsPage;