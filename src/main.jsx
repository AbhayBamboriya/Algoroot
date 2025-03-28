import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './content/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <AuthProvider> {/* Wrap the entire app */}
        <App />
      </AuthProvider>
  </BrowserRouter>,
)
