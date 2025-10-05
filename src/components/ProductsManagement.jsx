import React, { useState } from "react";

const ProductsManagement = () => {
  const [products] = useState([
    { id: 1, name: "Samsung Galaxy S24", category: "Electronics", price: 15999.99, stock: 45, status: "In Stock" },
    { id: 2, name: "iPhone 15 Pro", category: "Electronics", price: 22999.99, stock: 28, status: "In Stock" },
    { id: 3, name: "Office Chair Executive", category: "Furniture", price: 3499.99, stock: 12, status: "Low Stock" },
    { id: 4, name: "Desk Lamp LED", category: "Home & Office", price: 499.99, stock: 67, status: "In Stock" }
  ]);

  const formatZAR = (amount) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
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
              Product Management
            </h1>
            <p style={{ color: "#94a3b8", margin: 0 }}>Manage your product catalog and inventory</p>
          </div>
          <button style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span>+</span>
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #475569" }}>
            <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Total Products</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>{products.length}</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #475569" }}>
            <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Low Stock</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b" }}>{products.filter(p => p.status === "Low Stock").length}</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #475569" }}>
            <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Total Value</div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#10b981" }}>
              {formatZAR(products.reduce((sum, p) => sum + (p.price * p.stock), 0))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", borderRadius: "0.75rem", border: "1px solid #475569", overflow: "hidden" }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #475569" }}>
            <h3 style={{ margin: 0 }}>Product Catalog</h3>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#94a3b8" }}>Product</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#94a3b8" }}>Category</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#94a3b8" }}>Price</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#94a3b8" }}>Stock</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#94a3b8" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#94a3b8" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #374151" }}>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: "500" }}>{product.name}</div>
                    </td>
                    <td style={{ padding: "1rem", color: "#94a3b8" }}>{product.category}</td>
                    <td style={{ padding: "1rem", fontWeight: "600" }}>{formatZAR(product.price)}</td>
                    <td style={{ padding: "1rem" }}>{product.stock} units</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        background: product.status === "In Stock" ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)",
                        color: product.status === "In Stock" ? "#22c55e" : "#f59e0b"
                      }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button style={{
                          background: "rgba(59, 130, 246, 0.2)",
                          color: "#3b82f6",
                          border: "1px solid #3b82f6",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}>
                          Edit
                        </button>
                        <button style={{
                          background: "rgba(239, 68, 68, 0.2)",
                          color: "#ef4444",
                          border: "1px solid #ef4444",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          cursor: "pointer"
                        }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
