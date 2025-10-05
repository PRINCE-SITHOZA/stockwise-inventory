import React, { useState } from "react"
import "./Login.css"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // Simple demo login - accept any credentials from our user list
      if (email && password) {
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        
        // Check against our demo users
        const demoUsers = [
          { email: "prince@sa-warehouse.co.za", password: "admin123", name: "Prince Musa", role: "admin" },
          { email: "sarah@sa-warehouse.co.za", password: "manager123", name: "Sarah Johnson", role: "manager" },
          { email: "david@sa-warehouse.co.za", password: "staff123", name: "David Smith", role: "staff" },
          { email: "lisa@sa-warehouse.co.za", password: "manager123", name: "Lisa van der Merwe", role: "manager" },
          { email: "james@sa-warehouse.co.za", password: "staff123", name: "James Brown", role: "staff" },
          { email: "nomsa@sa-warehouse.co.za", password: "staff123", name: "Nomsa Dlamini", role: "staff" }
        ]
        
        const user = demoUsers.find(u => u.email === email && u.password === password)
        
        if (user) {
          onLogin(email, password)
        } else {
          setError("Invalid credentials. Use provided demo accounts.")
        }
      } else {
        setError("Please enter both email and password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>SA Warehouse</h1>
        <p>Enterprise Management System</p>
        
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="demo-credentials">
          <p><strong>Demo Accounts:</strong></p>
          <div style={{ fontSize: "0.875rem", textAlign: "left", marginTop: "0.5rem" }}>
            <div>Admin: prince@sa-warehouse.co.za / admin123</div>
            <div>Manager: sarah@sa-warehouse.co.za / manager123</div>
            <div>Staff: david@sa-warehouse.co.za / staff123</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
