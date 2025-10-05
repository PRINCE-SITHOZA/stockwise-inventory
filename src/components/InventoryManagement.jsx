import React, { useState } from "react";

const InventoryManagement = () => {
  const [inventory] = useState([
    { id: 1, product: "Samsung Galaxy S24", location: "A1-02", quantity: 45, minStock: 10, status: "In Stock" },
    { id: 2, product: "iPhone 15 Pro", location: "A1-03", quantity: 28, minStock: 8, status: "In Stock" },
    { id: 3, product: "Office Chair Executive", location: "B2-01", quantity: 5, minStock: 5, status: "Reorder" },
    { id: 4, product: "Desk Lamp LED", location: "C1-04", quantity: 67, minStock: 15, status: "In Stock" }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock": return { bg: "rgba(34, 197, 94, 0.2)", color: "#22c55e" };
      case "Low Stock": return { bg: "rgba(245, 158, 11, 0.2)", color: "#f59e0b" };
      case "Reorder": return { bg: "rgba(239, 68, 68, 0.2)", color: "#ef4444" };
      default: return { bg: "rgba(156, 163, 175, 0.2)", color: "#9ca3af" };
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ 
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "2rem",
              margin: 0
            }}>
              Inventory Management
            </h1>
            <p style={{ color: "#94a3b8", margin: 0 }}>Track and manage warehouse inventory levels</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{
              background: "rgba(59, 130, 246, 0.2)",
              color: "#3b82f6",
              border: "1px solid #3b82f6",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: "pointer"
            }}>
              Stock Take
            </button>
            <button style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: "pointer"
            }}>
              Receive Stock
            </button>
          </div>
        </div>

        {/* Alert Banner for Low Stock */}
        <div style={{
          background: "linear-gradient(135deg, #fef3c7, #fde68a)",
          color: "#92400e",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "2rem",
          border: "1px solid #fbbf24"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>??</span>
            <div>
              <strong>Inventory Alert:</strong> {inventory.filter(item => item.status === "Reorder").length} items need reordering
            </div>
          </div>
        </div>

        {/* Inventory Grid */}
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {inventory.map(item => {
            const statusStyle = getStatusColor(item.status);
            return (
              <div key={item.id} style={{
                background: "linear-gradient(135deg, #1e293b, #334155)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #475569",
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                alignItems: "center",
                gap: "1rem"
              }}>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>{item.product}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Location: {item.location}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Current Stock</div>
                  <div style={{ fontWeight: "600", fontSize: "1.25rem" }}>{item.quantity}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Min Stock</div>
                  <div style={{ fontWeight: "500" }}>{item.minStock}</div>
                </div>
                <div>
                  <span style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    background: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {item.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    color: "#3b82f6",
                    border: "1px solid #3b82f6",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem"
                  }}>
                    Adjust
                  </button>
                  {item.status === "Reorder" && (
                    <button style={{
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem"
                    }}>
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
