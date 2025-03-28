import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css'
import PrivateRoute from './components/PrivateRoute';
// import HomePage from './pages/homePage';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route 
          path="/details" 
          element={
            <PrivateRoute>
              <DetailsPage />
            </PrivateRoute>
          } 
        />
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;