import React, { useState, useEffect } from "react";

const AdvancedPermissions = () => {
  const [permissions, setPermissions] = useState({});
  const [userRoles, setUserRoles] = useState([]);

  // Comprehensive permission matrix
  const permissionMatrix = {
    admin: {
      dashboard: ['view', 'export', 'configure'],
      products: ['create', 'read', 'update', 'delete', 'export', 'import'],
      inventory: ['create', 'read', 'update', 'delete', 'adjust', 'export'],
      users: ['create', 'read', 'update', 'delete', 'roles', 'permissions'],
      reports: ['view', 'generate', 'export', 'configure'],
      settings: ['read', 'update', 'system', 'security'],
      audit: ['view', 'export', 'purge']
    },
    manager: {
      dashboard: ['view', 'export'],
      products: ['create', 'read', 'update', 'export'],
      inventory: ['create', 'read', 'update', 'adjust', 'export'],
      users: ['read'],
      reports: ['view', 'generate', 'export'],
      settings: ['read'],
      audit: ['view']
    },
    staff: {
      dashboard: ['view'],
      products: ['read'],
      inventory: ['read'],
      users: [],
      reports: ['view'],
      settings: [],
      audit: []
    }
  };

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: '??' },
    { id: 'products', name: 'Products', icon: '??' },
    { id: 'inventory', name: 'Inventory', icon: '??' },
    { id: 'users', name: 'Users', icon: '??' },
    { id: 'reports', name: 'Reports', icon: '??' },
    { id: 'settings', name: 'Settings', icon: '??' },
    { id: 'audit', name: 'Audit Trail', icon: '??' }
  ];

  const actions = [
    { id: 'view', name: 'View', color: '#3B82F6' },
    { id: 'create', name: 'Create', color: '#10B981' },
    { id: 'update', name: 'Update', color: '#F59E0B' },
    { id: 'delete', name: 'Delete', color: '#EF4444' },
    { id: 'export', name: 'Export', color: '#8B5CF6' },
    { id: 'import', name: 'Import', color: '#EC4899' },
    { id: 'adjust', name: 'Adjust', color: '#06B6D4' },
    { id: 'configure', name: 'Configure', color: '#84CC16' },
    { id: 'roles', name: 'Manage Roles', color: '#F97316' },
    { id: 'permissions', name: 'Permissions', color: '#A855F7' },
    { id: 'generate', name: 'Generate', color: '#14B8A6' },
    { id: 'system', name: 'System', color: '#64748B' },
    { id: 'security', name: 'Security', color: '#DC2626' },
    { id: 'purge', name: 'Purge', color: '#000000' }
  ];

  useEffect(() => {
    setPermissions(permissionMatrix);
    setUserRoles(['admin', 'manager', 'staff']);
  }, []);

  const hasPermission = (role, module, action) => {
    return permissions[role]?.[module]?.includes(action) || false;
  };

  const togglePermission = (role, module, action) => {
    setPermissions(prev => {
      const newPermissions = { ...prev };
      const currentPermissions = newPermissions[role]?.[module] || [];
      
      if (currentPermissions.includes(action)) {
        newPermissions[role][module] = currentPermissions.filter(a => a !== action);
      } else {
        newPermissions[role][module] = [...currentPermissions, action];
      }
      
      return newPermissions;
    });
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      padding: "1.5rem",
      borderRadius: "1rem",
      border: "1px solid #334155",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      marginBottom: "2rem"
    }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.5rem", color: "#F8FAFC" }}>
        ?? Advanced Permission Matrix
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#0F172A" }}>
              <th style={{ 
                padding: "1rem", 
                textAlign: "left", 
                fontWeight: "600", 
                color: "#F8FAFC", 
                borderBottom: "1px solid #334155",
                position: "sticky",
                left: 0,
                backgroundColor: "#0F172A",
                minWidth: "200px"
              }}>
                Module / Action
              </th>
              {userRoles.map(role => (
                <th key={role} style={{ 
                  padding: "1rem", 
                  textAlign: "center", 
                  fontWeight: "600", 
                  color: "#F8FAFC", 
                  borderBottom: "1px solid #334155",
                  textTransform: "capitalize",
                  minWidth: "120px"
                }}>
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map(module => (
              <React.Fragment key={module.id}>
                {/* Module Header */}
                <tr style={{ backgroundColor: "#1E293B" }}>
                  <td style={{ 
                    padding: "0.75rem", 
                    fontWeight: "600", 
                    color: "#F8FAFC",
                    borderBottom: "1px solid #334155",
                    position: "sticky",
                    left: 0,
                    backgroundColor: "#1E293B"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1rem" }}>{module.icon}</span>
                      {module.name}
                    </div>
                  </td>
                  {userRoles.map(role => (
                    <td key={role} style={{ 
                      padding: "0.75rem", 
                      textAlign: "center", 
                      borderBottom: "1px solid #334155",
                      backgroundColor: "#1E293B"
                    }}>
                      {/* Module-level toggle could go here */}
                    </td>
                  ))}
                </tr>
                
                {/* Actions for this module */}
                {actions.map(action => (
                  <tr key={`${module.id}-${action.id}`} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ 
                      padding: "0.5rem 0.75rem 0.5rem 2rem", 
                      color: "#94A3B8",
                      borderBottom: "1px solid #334155",
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#0F172A"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: action.color,
                          borderRadius: "50%"
                        }} />
                        {action.name}
                      </div>
                    </td>
                    {userRoles.map(role => (
                      <td key={role} style={{ 
                        padding: "0.5rem", 
                        textAlign: "center", 
                        borderBottom: "1px solid #334155"
                      }}>
                        <button
                          onClick={() => togglePermission(role, module.id, action.id)}
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "4px",
                            border: `2px solid ${hasPermission(role, module.id, action.id) ? action.color : '#374151'}`,
                            backgroundColor: hasPermission(role, module.id, action.id) ? action.color : 'transparent',
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            if (!hasPermission(role, module.id, action.id)) {
                              e.target.style.backgroundColor = action.color + '40';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!hasPermission(role, module.id, action.id)) {
                              e.target.style.backgroundColor = 'transparent';
                            }
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission Summary */}
      <div style={{ 
        marginTop: "1.5rem", 
        padding: "1rem",
        backgroundColor: "#0F172A",
        borderRadius: "0.5rem",
        border: "1px solid #334155"
      }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.75rem", color: "#F8FAFC" }}>
          Role Summaries
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {userRoles.map(role => (
            <div key={role} style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "0.875rem", 
                fontWeight: "600", 
                color: "#F8FAFC",
                textTransform: "capitalize",
                marginBottom: "0.25rem"
              }}>
                {role}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                {Object.values(permissions[role] || {}).flat().length} permissions
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedPermissions;
