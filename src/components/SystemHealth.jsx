import React, { useState, useEffect } from "react";

const SystemHealth = () => {
  const [systemMetrics, setSystemMetrics] = useState({});
  const [apiStatus, setApiStatus] = useState({});

  useEffect(() => {
    // Simulate system metrics
    const metrics = {
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      diskUsage: 65 + Math.random() * 20,
      networkLatency: 25 + Math.random() * 50,
      activeUsers: 15 + Math.floor(Math.random() * 10),
      databaseConnections: 8 + Math.floor(Math.random() * 5),
      queueSize: Math.floor(Math.random() * 100),
      errorRate: Math.random() * 5
    };

    const apiStatuses = {
      'Authentication API': { status: 'healthy', responseTime: 45 },
      'Product API': { status: 'healthy', responseTime: 67 },
      'Inventory API': { status: 'degraded', responseTime: 234 },
      'Reporting API': { status: 'healthy', responseTime: 89 },
      'User Management API': { status: 'healthy', responseTime: 56 },
      'Audit API': { status: 'maintenance', responseTime: 0 }
    };

    setSystemMetrics(metrics);
    setApiStatus(apiStatuses);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.random() * 100,
        activeUsers: 15 + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'degraded': return '#F59E0B';
      case 'unhealthy': return '#EF4444';
      case 'maintenance': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getUsageColor = (usage) => {
    if (usage < 70) return '#10B981';
    if (usage < 85) return '#F59E0B';
    return '#EF4444';
  };

  const MetricCard = ({ title, value, unit, usage, max = 100 }) => (
    <div style={{
      background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid #334155",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "0.875rem", color: "#94A3B8", marginBottom: "0.5rem" }}>{title}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#F8FAFC", marginBottom: "0.5rem" }}>
        {value}{unit}
      </div>
      {usage !== undefined && (
        <div style={{
          height: "4px",
          backgroundColor: "#374151",
          borderRadius: "2px",
          overflow: "hidden"
        }}>
          <div style={{
            height: "100%",
            width: `${(usage / max) * 100}%`,
            backgroundColor: getUsageColor(usage),
            transition: "width 0.3s ease"
          }} />
        </div>
      )}
    </div>
  );

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
        ??? System Health Monitor
      </h3>

      {/* System Metrics */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
        gap: "1rem", 
        marginBottom: "2rem" 
      }}>
        <MetricCard title="CPU Usage" value={systemMetrics.cpuUsage?.toFixed(1)} unit="%" usage={systemMetrics.cpuUsage} />
        <MetricCard title="Memory Usage" value={systemMetrics.memoryUsage?.toFixed(1)} unit="%" usage={systemMetrics.memoryUsage} />
        <MetricCard title="Disk Usage" value={systemMetrics.diskUsage?.toFixed(1)} unit="%" usage={systemMetrics.diskUsage} />
        <MetricCard title="Network Latency" value={systemMetrics.networkLatency?.toFixed(0)} unit="ms" usage={systemMetrics.networkLatency} max={300} />
        <MetricCard title="Active Users" value={systemMetrics.activeUsers} unit="" usage={systemMetrics.activeUsers} max={50} />
        <MetricCard title="Database Connections" value={systemMetrics.databaseConnections} unit="" usage={systemMetrics.databaseConnections} max={20} />
      </div>

      {/* API Status */}
      <div>
        <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem", color: "#F8FAFC" }}>
          API Status
        </h4>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {Object.entries(apiStatus).map(([api, status]) => (
            <div key={api} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem",
              backgroundColor: "#0F172A",
              borderRadius: "0.375rem",
              border: "1px solid #334155"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: getStatusColor(status.status),
                  borderRadius: "50%"
                }} />
                <span style={{ color: "#F8FAFC", fontSize: "0.875rem" }}>{api}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ 
                  color: getStatusColor(status.status),
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  textTransform: "capitalize"
                }}>
                  {status.status}
                </span>
                {status.responseTime > 0 && (
                  <span style={{ color: "#94A3B8", fontSize: "0.75rem" }}>
                    {status.responseTime}ms
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Alerts */}
      <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#0F172A", borderRadius: "0.5rem", border: "1px solid #334155" }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", color: "#F8FAFC" }}>
          ?? System Alerts
        </h4>
        <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
          {systemMetrics.errorRate > 2 ? (
            <span style={{ color: "#EF4444" }}>High error rate detected: {systemMetrics.errorRate?.toFixed(1)}%</span>
          ) : systemMetrics.diskUsage > 80 ? (
            <span style={{ color: "#F59E0B" }}>Disk usage is high: {systemMetrics.diskUsage?.toFixed(1)}%</span>
          ) : (
            <span style={{ color: "#10B981" }}>All systems operational</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
