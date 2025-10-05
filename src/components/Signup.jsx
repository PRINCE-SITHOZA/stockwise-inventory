import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      // Mock signup for testing
      if (formData.email && formData.password) {
        localStorage.setItem("token", "mock-token");
        localStorage.setItem("user", JSON.stringify({ 
          name: formData.name, 
          email: formData.email 
        }));
        alert("Account created successfully! (This is a mock signup)");
        window.location.href = "/dashboard";
        return;
      }

      // Replace with your actual backend endpoint
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "#f9fafb",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Create Account
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
          Sign up for a new account
        </p>
        
        {error && (
          <div style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            marginBottom: "1rem"
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: loading ? "#f3f4f6" : "white"
              }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: loading ? "#f3f4f6" : "white"
              }}
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: loading ? "#f3f4f6" : "white"
              }}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                backgroundColor: loading ? "#f3f4f6" : "white"
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: loading ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
          <p>Already have an account? <a href="/login" style={{ color: "#3b82f6", textDecoration: "none" }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
