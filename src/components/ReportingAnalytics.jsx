import React from "react"

const ReportingAnalytics = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0f172a", 
      color: "white",
      padding: "1rem" 
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto" 
      }}>
        <h1 style={{ marginBottom: "1rem" }}>Reporting & Analytics</h1>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #475569"
          }}>
            <h3>Sales Report</h3>
            <p>Monthly sales data will be displayed here</p>
            <div style={{
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem"
            }}>
              Chart Placeholder
            </div>
          </div>
          
          <div style={{
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #475569"
          }}>
            <h3>Inventory Report</h3>
            <p>Inventory analytics will be displayed here</p>
            <div style={{
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem"
            }}>
              Chart Placeholder
            </div>
          </div>
        </div>
        
        <div style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid #475569"
        }}>
          <h3>Quick Stats</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginTop: "1rem"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>12.4%</div>
              <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Growth</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>R2.4M</div>
              <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Revenue</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b" }}>1,247</div>
              <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Products</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#8b5cf6" }}>89%</div>
              <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Efficiency</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportingAnalytics
