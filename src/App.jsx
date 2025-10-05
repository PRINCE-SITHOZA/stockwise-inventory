import React, { useState, useEffect } from "react"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import "./App.css"
import "./responsive.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const handleLogin = (email, password) => {
    // Enhanced login with user data
    const users = [
      { email: "prince@sa-warehouse.co.za", password: "admin123", name: "Prince Musa", role: "admin" },
      { email: "sarah@sa-warehouse.co.za", password: "manager123", name: "Sarah Johnson", role: "manager" },
      { email: "david@sa-warehouse.co.za", password: "staff123", name: "David Smith", role: "staff" },
      { email: "lisa@sa-warehouse.co.za", password: "manager123", name: "Lisa van der Merwe", role: "manager" },
      { email: "james@sa-warehouse.co.za", password: "staff123", name: "James Brown", role: "staff" },
      { email: "nomsa@sa-warehouse.co.za", password: "staff123", name: "Nomsa Dlamini", role: "staff" }
    ]
    
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      localStorage.setItem("token", "demo-token")
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }))
      localStorage.setItem("role", user.role)
      setIsAuthenticated(true)
      
      // Record login activity
      const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]')
      activityLog.unshift({
        id: activityLog.length + 1,
        user: user.name,
        action: "User logged in",
        timestamp: new Date().toISOString(),
        details: `${user.role} login successful`
      })
      localStorage.setItem('activityLog', JSON.stringify(activityLog.slice(0, 50)))
    } else {
      alert("Invalid credentials. Use provided demo accounts.")
    }
  }

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    
    // Record logout activity
    const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]')
    activityLog.unshift({
      id: activityLog.length + 1,
      user: user.name,
      action: "User logged out",
      timestamp: new Date().toISOString(),
      details: "User session ended"
    })
    localStorage.setItem('activityLog', JSON.stringify(activityLog.slice(0, 50)))
    
    localStorage.clear()
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh",
        background: "#0f172a",
        color: "white"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>?</div>
          <h2>Loading SA Warehouse...</h2>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} />
}

export default App
