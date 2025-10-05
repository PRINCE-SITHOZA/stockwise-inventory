import React, { useState, useEffect } from "react";

const AuditTrail = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filters, setFilters] = useState({
    user: '',
    action: '',
    dateRange: '7days',
    severity: ''
  });

  // Comprehensive audit trail data
  const auditData = [
    {
      id: 1,
      timestamp: new Date('2025-01-15T14:30:00'),
      user: 'Sipho Ndlovu',
      action: 'PRODUCT_CREATED',
      description: 'Created new product: Samsung Galaxy A54',
      severity: 'INFO',
      ipAddress: '41.13.128.45',
      userAgent: 'Chrome/120.0 Windows',
      affectedResource: 'products/123',
      changes: { name: 'Samsung Galaxy A54', price: 8999.99 }
    },
    {
      id: 2,
      timestamp: new Date('2025-01-15T14:25:00'),
      user: 'Lerato Mbatha',
      action: 'STOCK_ADJUSTED',
      description: 'Adjusted stock for Koo Baked Beans: +50 units',
      severity: 'INFO',
      ipAddress: '105.12.88.201',
      userAgent: 'Safari/17.0 macOS',
      affectedResource: 'inventory/456',
      changes: { previousStock: 8, newStock: 58, reason: 'New shipment' }
    },
    {
      id: 3,
      timestamp: new Date('2025-01-15T14:20:00'),
      user: 'Thabo van der Merwe',
      action: 'USER_LOGIN',
      description: 'Successful login from new device',
      severity: 'INFO',
      ipAddress: '102.135.64.32',
      userAgent: 'Firefox/121.0 Windows',
      affectedResource: 'auth/session',
      changes: {}
    },
    {
      id: 4,
      timestamp: new Date('2025-01-15T14:15:00'),
      user: 'System',
      action: 'LOW_STOCK_ALERT',
      description: 'Low stock alert triggered for Game Laptop',
      severity: 'WARNING',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      affectedResource: 'alerts/789',
      changes: { product: 'Game Laptop', currentStock: 0, threshold: 5 }
    },
    {
      id: 5,
      timestamp: new Date('2025-01-15T14:10:00'),
      user: 'Sipho Ndlovu',
      action: 'USER_ROLE_CHANGED',
      description: 'Changed user role for Nomsa Petersen from Staff to Manager',
      severity: 'CRITICAL',
      ipAddress: '41.13.128.45',
      userAgent: 'Chrome/120.0 Windows',
      affectedResource: 'users/789',
      changes: { previousRole: 'staff', newRole: 'manager' }
    },
    {
      id: 6,
      timestamp: new Date('2025-01-15T14:05:00'),
      user: 'Lerato Mbatha',
      action: 'PRODUCT_PRICE_CHANGED',
      description: 'Updated price for Office Chair from R1199.99 to R1249.99',
      severity: 'INFO',
      ipAddress: '105.12.88.201',
      userAgent: 'Safari/17.0 macOS',
      affectedResource: 'products/456',
      changes: { previousPrice: 1199.99, newPrice: 1249.99 }
    },
    {
      id: 7,
      timestamp: new Date('2025-01-15T14:00:00'),
      user: 'System',
      action: 'BACKUP_COMPLETED',
      description: 'Automated database backup completed successfully',
      severity: 'INFO',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      affectedResource: 'system/backup',
      changes: { backupSize: '2.4GB', duration: '45s' }
    },
    {
      id: 8,
      timestamp: new Date('2025-01-15T13:55:00'),
      user: 'Thabo van der Merwe',
      action: 'FAILED_LOGIN_ATTEMPT',
      description: 'Failed login attempt with invalid credentials',
      severity: 'WARNING',
      ipAddress: '102.135.64.32',
      userAgent: 'Firefox/121.0 Windows',
      affectedResource: 'auth/attempt',
      changes: { attemptedUser: 'admin', reason: 'Invalid password' }
    }
  ];

  useEffect(() => {
    setAuditLogs(auditData);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'INFO': return '#3B82F6';
      case 'WARNING': return '#F59E0B';
      case 'CRITICAL': return '#EF4444';
      case 'SUCCESS': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getActionIcon = (action) => {
    const icons = {
      'PRODUCT_CREATED': '??',
      'STOCK_ADJUSTED': '??',
      'USER_LOGIN': '??',
      'LOW_STOCK_ALERT': '??',
      'USER_ROLE_CHANGED': '??',
      'PRODUCT_PRICE_CHANGED': '??',
      'BACKUP_COMPLETED': '??',
      'FAILED_LOGIN_ATTEMPT': '??'
    };
    return icons[action] || '??';
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const exportAuditLog = () => {
    const csvContent = auditLogs.map(log => 
      `"${formatDateTime(log.timestamp)}","${log.user}","${log.action}","${log.description}","${log.severity}","${log.ipAddress}"`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,User,Action,Description,Severity,IP Address\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#F8FAFC" }}>
          ?? Comprehensive Audit Trail
        </h3>
        <button
          onClick={exportAuditLog}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <select
          value={filters.severity}
          onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
          style={{
            padding: "0.5rem",
            backgroundColor: "#0F172A",
            border: "1px solid #334155",
            borderRadius: "0.375rem",
            color: "#F8FAFC",
            fontSize: "0.875rem"
          }}
        >
          <option value="">All Severities</option>
          <option value="INFO">Info</option>
          <option value="WARNING">Warning</option>
          <option value="CRITICAL">Critical</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
          style={{
            padding: "0.5rem",
            backgroundColor: "#0F172A",
            border: "1px solid #334155",
            borderRadius: "0.375rem",
            color: "#F8FAFC",
            fontSize: "0.875rem"
          }}
        >
          <option value="1day">Last 24 Hours</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#0F172A", position: "sticky", top: 0 }}>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#F8FAFC", borderBottom: "1px solid #334155" }}>Time</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#F8FAFC", borderBottom: "1px solid #334155" }}>User</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#F8FAFC", borderBottom: "1px solid #334155" }}>Action</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#F8FAFC", borderBottom: "1px solid #334155" }}>Description</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#F8FAFC", borderBottom: "1px solid #334155" }}>Severity</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "600", color: "#F8FAFC", borderBottom: "1px solid #334155" }}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid #334155", transition: "background-color 0.2s" }}
                  onMouseEnter={(e) => e.target.parentNode.style.backgroundColor = "#1E293B"}
                  onMouseLeave={(e) => e.target.parentNode.style.backgroundColor = "transparent"}>
                <td style={{ padding: "0.75rem", color: "#94A3B8", whiteSpace: "nowrap" }}>
                  {formatDateTime(log.timestamp)}
                </td>
                <td style={{ padding: "0.75rem", color: "#F8FAFC", fontWeight: "500" }}>
                  {log.user}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1rem" }}>{getActionIcon(log.action)}</span>
                    <span style={{ color: "#F8FAFC" }}>{log.action.replace(/_/g, ' ')}</span>
                  </div>
                </td>
                <td style={{ padding: "0.75rem", color: "#94A3B8", maxWidth: "300px" }}>
                  {log.description}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <span style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: getSeverityColor(log.severity) + "20",
                    color: getSeverityColor(log.severity),
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600"
                  }}>
                    {log.severity}
                  </span>
                </td>
                <td style={{ padding: "0.75rem", color: "#64748B", fontFamily: "monospace" }}>
                  {log.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #334155" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#F8FAFC" }}>{auditLogs.length}</div>
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Total Events</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#3B82F6" }}>
            {auditLogs.filter(log => log.severity === 'INFO').length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Info Events</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#F59E0B" }}>
            {auditLogs.filter(log => log.severity === 'WARNING').length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Warnings</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#EF4444" }}>
            {auditLogs.filter(log => log.severity === 'CRITICAL').length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Critical</div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
