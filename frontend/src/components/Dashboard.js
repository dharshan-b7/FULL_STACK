import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { getMaterials } from "../services/analysisService";

const Dashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState({
    totalProcessed: 0,
    aluminumYield: 0,
    byproductsManaged: 0,
    pendingAnalysis: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const materials = await getMaterials();

      const avgYield =
        materials.length > 0
          ? (
              materials.reduce((sum, m) => sum + m.quality_percent, 0) /
              materials.length
            ).toFixed(1)
          : 0;

      setStats({
        totalProcessed: materials.length,
        aluminumYield: avgYield,
        byproductsManaged: 14, // (later link with real table)
        pendingAnalysis: materials.filter((m) => m.status === "pending").length,
      });

      setRecentActivities(
        materials.slice(0, 5).map((m) => ({
          icon: "📦",
          title: `Processed ${m.material_name}`,
          time: `Date: ${
            m.created_at ? m.created_at.split("T")[0] : "Unknown"
          }`,
        }))
      );
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🔬 Aluminum Recovery System</h2>
        </div>
        <div className="nav-menu">
          <button
            onClick={() => navigate("/dashboard")}
            className="nav-link active"
          >
            Dashboard
          </button>

          <button onClick={() => navigate("/analysis")} className="nav-link">
            Material Analysis
          </button>

          <button onClick={() => navigate("/byproducts")} className="nav-link">
            By-Products
          </button>

  

          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>
            Welcome !
          </h1>
          <p className="user-role">Role: {user.role}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{stats.totalProcessed}</h3>
              <p>Materials Processed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚗️</div>
            <div className="stat-info">
              <h3>{stats.aluminumYield}%</h3>
              <p>Avg. Aluminum Yield</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">♻️</div>
            <div className="stat-info">
              <h3>{stats.byproductsManaged}</h3>
              <p>By-Products Managed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pendingAnalysis}</h3>
              <p>Pending Analysis</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button
              className="action-btn"
              onClick={() => navigate("/analysis")}
            >
              <span className="action-icon">🔍</span>
              <span>Analyze Material</span>
            </button>

            <button
              className="action-btn"
              onClick={() => navigate("/byproducts")}
            >
              <span className="action-icon">♻️</span>
              <span>Manage By-Products</span>
            </button>


          </div>
        </div>

        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">{a.icon}</div>
                  <div className="activity-details">
                    <p className="activity-title">{a.title}</p>
                    <p className="activity-time">{a.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activities">No recent activities</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
