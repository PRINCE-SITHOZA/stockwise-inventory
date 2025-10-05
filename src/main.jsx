import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./App.css"
import "./responsive.css"

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  const rootElement = document.getElementById("root")
  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement)
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
      console.log("React app mounted successfully")
    } catch (error) {
      console.error("Error mounting React app:", error)
      // Fallback: show error message
      rootElement.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: white; background: #dc2626;">
          <h2>Application Error</h2>
          <p>Failed to load the application. Please refresh the page.</p>
          <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; margin-top: 1rem; background: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `
    }
  } else {
    console.error("Root element not found")
  }
})
