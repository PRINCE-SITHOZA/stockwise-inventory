import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // South African users data
  const mockUsers = [
    { id: 1, name: "Sipho Ndlovu", email: "admin@sa-warehouse.co.za", role: "admin", phone: "+27 11 123 4567", location: "Johannesburg", isActive: true },
    { id: 2, name: "Lerato Mbatha", email: "manager@sa-warehouse.co.za", role: "manager", phone: "+27 21 987 6543", location: "Cape Town", isActive: true },
    { id: 3, name: "Thabo van der Merwe", email: "staff@sa-warehouse.co.za", role: "staff", phone: "+27 31 456 7890", location: "Durban", isActive: true },
    { id: 4, name: "Nomsa Petersen", email: "nomsa@sa-warehouse.co.za", role: "staff", phone: "+27 12 345 6789", location: "Pretoria", isActive: false },
    { id: 5, name: "James Khumalo", email: "james@sa-warehouse.co.za", role: "manager", phone: "+27 41 234 5678", location: "Port Elizabeth", isActive: true }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff",
    phone: "",
    location: "",
    password: ""
  });

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const southAfricanCities = [
    "Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth",
    "Bloemfontein", "East London", "Kimberley", "Polokwane", "Nelspruit"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (editingUser) {
        setUsers(prev => prev.map(u => 
          u.id === editingUser.id ? { ...formData, id: editingUser.id, isActive: true } : u
        ));
      } else {
        const newUser = {
          ...formData,
          id: users.length + 1,
          isActive: true
        };
        setUsers(prev => [...prev, newUser]);
      }

      setFormData({ name: "", email: "", role: "staff", phone: "", location: "", password: "" });
      setShowForm(false);
      setEditingUser(null);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      password: ""
    });
    setEditingUser(user);
    setShowForm(true);
  };

  const handleToggleActive = (userId) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "#dc2626";
      case "manager": return "#f59e0b";
      case "staff": return "#3b82f6";
      default: return "#6b7280";
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b" }}>
            User Management
          </h1>
          <p style={{ color: "#64748b", marginTop: "0.25rem" }}>
            Manage South African warehouse staff
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            onClick={() => window.location.href = "/dashboard"}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => {
              setFormData({ name: "", email: "", role: "staff", phone: "", location: "", password: "" });
              setEditingUser(null);
              setShowForm(true);
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            + Add User
          </button>
        </div>
      </header>

      <div style={{ padding: "2rem" }}>
        {/* User Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #dc2626"
          }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", marginBottom: "0.5rem" }}>
              Total Users
            </h3>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1e293b" }}>
              {users.length}
            </p>
          </div>

          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #f59e0b"
          }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", marginBottom: "0.5rem" }}>
              Active Users
            </h3>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1e293b" }}>
              {users.filter(u => u.isActive).length}
            </p>
          </div>

          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #3b82f6"
          }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", marginBottom: "0.5rem" }}>
              Staff Members
            </h3>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1e293b" }}>
              {users.filter(u => u.role === "staff").length}
            </p>
          </div>

          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #10b981"
          }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", marginBottom: "0.5rem" }}>
              Locations
            </h3>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1e293b" }}>
              {new Set(users.map(u => u.location)).size}
            </p>
          </div>
        </div>

        {/* User Form Modal */}
        {showForm && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflow: "auto"
            }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+27 XX XXX XXXX"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem"
                    }}
                  >
                    <option value="">Select City</option>
                    {southAfricanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem"
                    }}
                  >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {!editingUser && (
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem"
                      }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingUser(null);
                    }}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#6b7280",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: loading ? "#9ca3af" : "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: loading ? "not-allowed" : "pointer"
                    }}
                  >
                    {loading ? "Saving..." : (editingUser ? "Update User" : "Add User")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden"
        }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
              Warehouse Staff ({users.length})
            </h3>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e2e8f0" }}>User</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e2e8f0" }}>Contact</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e2e8f0" }}>Location</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e2e8f0" }}>Role</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e2e8f0" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <div style={{ fontWeight: "500", color: "#1e293b" }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem", color: "#64748b" }}>
                      {user.phone}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        borderRadius: "0.25rem",
                        fontSize: "0.875rem",
                        fontWeight: "500"
                      }}>
                        {user.location}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: getRoleColor(user.role) + "20",
                        color: getRoleColor(user.role),
                        borderRadius: "1rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        textTransform: "capitalize"
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: user.isActive ? "#10b98120" : "#6b728020",
                        color: user.isActive ? "#10b981" : "#6b7280",
                        borderRadius: "1rem",
                        fontSize: "0.875rem",
                        fontWeight: "500"
                      }}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => handleEdit(user)}
                          style={{
                            padding: "0.5rem",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(user.id)}
                          style={{
                            padding: "0.5rem",
                            backgroundColor: user.isActive ? "#ef4444" : "#10b981",
                            color: "white",
                            border: "none",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
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

export default UserManagement;
