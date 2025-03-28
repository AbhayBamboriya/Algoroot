import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
      </Routes>
    </div>
  );
}

export default App;