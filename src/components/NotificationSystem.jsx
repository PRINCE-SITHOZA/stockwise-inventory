import React, { useState, useEffect } from "react";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock real-time notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "warning",
        title: "Low Stock Alert",
        message: "Samsung Galaxy A54 stock below threshold (5 remaining)",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        priority: "high"
      },
      {
        id: 2,
        type: "success",
        title: "Order Completed",
        message: "Large order #SA-2024-0012 has been processed successfully",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
        priority: "medium"
      },
      {
        id: 3,
        type: "info",
        title: "Inventory Update",
        message: "Weekly stock count completed for Johannesburg warehouse",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        priority: "low"
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: ["info", "success", "warning"][Math.floor(Math.random() * 3)],
        title: ["New Order", "Stock Update", "System Alert"][Math.floor(Math.random() * 3)],
        message: `Automated system update ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
        read: false,
        priority: "medium"
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success": return "?";
      case "warning": return "??";
      case "info": return "??";
      default: return "??";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#EF4444";
      case "medium": return "#F59E0B";
      case "low": return "#3B82F6";
      default: return "#6B7280";
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: "1rem",
      right: "1rem",
      zIndex: 1000,
      maxWidth: "400px"
    }}>
      {/* Notification Bell */}
      <div style={{
        position: "relative",
        marginBottom: "0.5rem",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <button
          onClick={() => {
            const notificationPanel = document.getElementById('notification-panel');
            notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
          }}
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
            fontSize: "1.25rem",
            color: "white"
          }}
        >
          ??
          {unreadCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "#EF4444",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      <div
        id="notification-panel"
        style={{
          display: "none",
          background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
          border: "1px solid #475569",
          borderRadius: "1rem",
          padding: "1rem",
          maxHeight: "400px",
          overflowY: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)"
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid #475569"
        }}>
          <h3 style={{ color: "#F8FAFC", fontWeight: "600", fontSize: "1.125rem" }}>
            Notifications
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                background: "none",
                border: "none",
                color: "#60A5FA",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500"
              }}
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div style={{ color: "#94A3B8", textAlign: "center", padding: "2rem" }}>
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                padding: "0.75rem",
                marginBottom: "0.5rem",
                background: notification.read ? "transparent" : "rgba(59, 130, 246, 0.1)",
                border: "1px solid #475569",
                borderRadius: "0.5rem",
                borderLeft: `4px solid ${getPriorityColor(notification.priority)}`,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onClick={() => markAsRead(notification.id)}
              onMouseOver={(e) => e.target.style.background = "rgba(59, 130, 246, 0.2)"}
              onMouseOut={(e) => e.target.style.background = notification.read ? "transparent" : "rgba(59, 130, 246, 0.1)"}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>
                  {getNotificationIcon(notification.type)}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.25rem"
                  }}>
                    <div style={{
                      fontWeight: notification.read ? "400" : "600",
                      color: "#F8FAFC",
                      fontSize: "0.875rem"
                    }}>
                      {notification.title}
                    </div>
                    {!notification.read && (
                      <div style={{
                        width: "8px",
                        height: "8px",
                        background: "#EF4444",
                        borderRadius: "50%",
                        flexShrink: 0
                      }} />
                    )}
                  </div>
                  <div style={{
                    color: "#94A3B8",
                    fontSize: "0.75rem",
                    lineHeight: "1.4",
                    marginBottom: "0.25rem"
                  }}>
                    {notification.message}
                  </div>
                  <div style={{
                    color: "#64748B",
                    fontSize: "0.625rem"
                  }}>
                    {notification.timestamp.toLocaleTimeString()} • {notification.priority} priority
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSystem;
