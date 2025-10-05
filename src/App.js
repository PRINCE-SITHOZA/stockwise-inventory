import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import ProductManagement from "./components/ProductManagement";
import InventoryManagement from "./components/InventoryManagement";
import ReportingAnalytics from "./components/ReportingAnalytics";
import UserManagement from "./components/UserManagement";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  // Check if user is logged in
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role") || "staff";

  // Check if user has permission for admin/manager routes
  const hasManagementAccess = ["admin", "manager"].includes(userRole);
  const isAdmin = userRole === "admin";

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/signup" 
              element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/products" 
              element={isAuthenticated && hasManagementAccess ? <ProductManagement /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/inventory" 
              element={isAuthenticated && hasManagementAccess ? <InventoryManagement /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/reports" 
              element={isAuthenticated ? <ReportingAnalytics /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/users" 
              element={isAuthenticated && isAdmin ? <UserManagement /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
            />
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  backgroundColor: '#0F172A',
                  color: '#F8FAFC',
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>??</div>
                  <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                    Page Not Found
                  </h1>
                  <p style={{ color: '#94A3B8', marginBottom: '2rem', fontSize: '1.125rem' }}>
                    The page you're looking for doesn't exist.
                  </p>
                  <button
                    onClick={() => window.location.href = '/'}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    Go Back Home
                  </button>
                </div>
              } 
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
