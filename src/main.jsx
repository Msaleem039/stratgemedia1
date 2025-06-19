import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import VideoDetail from './VideoDetail.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import { AuthProvider } from './utils/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          } />
          <Route path="/video/:id" element={
            <ProtectedRoute>
              <VideoDetail />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
) 