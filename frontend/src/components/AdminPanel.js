import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import { adminService } from '../services/adminService';

const AdminPanel = ({ user, onLogout }) => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    activeProcesses: 0,
    systemHealth: 'Good'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingUsers();
    fetchSystemStats();
  }, []);


const fetchPendingUsers = async () => {
  try {
    const data = await adminService.getPendingUsers();
    setPendingUsers(data.users || []);
  } catch (err) {
    console.error('Error fetching pending users:', err);
  }
};

const fetchSystemStats = async () => {
  try {
    const data = await adminService.getAdminStats();
    setSystemStats(data.stats);
  } catch (err) {
    console.error('Error fetching system stats:', err);
  }
};

const handleApproval = async (userId, approved) => {
  try {
    await adminService.approveUser(userId, approved);
    fetchPendingUsers();
    fetchSystemStats();
  } catch (err) {
    console.error('Error processing approval:', err);
  }
};

  return (
    <div className="admin-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>⚙️ Admin Panel</h2>
        </div>
        <div className="nav-menu">
          <button onClick={() => navigate('/dashboard')} className="nav-link">
            Dashboard
          </button>
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-content">
        <h1>System Administration</h1>

        <div className="stats-overview">
          <div className="stat-box">
            <h3>{systemStats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-box">
            <h3>{systemStats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
          <div className="stat-box">
            <h3>{systemStats.activeProcesses}</h3>
            <p>Active Processes</p>
          </div>
          <div className="stat-box">
            <h3>{systemStats.systemHealth}</h3>
            <p>System Health</p>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'users' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={activeTab === 'processes' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('processes')}
          >
            Process Oversight
          </button>
          <button 
            className={activeTab === 'settings' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('settings')}
          >
            System Settings
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="tab-content">
            <h2>Pending User Approvals</h2>
            {pendingUsers.length > 0 ? (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Organization</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((pendingUser) => (
                      <tr key={pendingUser.id}>
                        <td>{pendingUser.fullName}</td>
                        <td>{pendingUser.email}</td>
                        <td><span className="role-badge">{pendingUser.role}</span></td>
                        <td>{pendingUser.organization}</td>
                        <td>{pendingUser.registrationDate}</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-approve"
                            onClick={() => handleApproval(pendingUser.id, true)}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => handleApproval(pendingUser.id, false)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">No pending user approvals</p>
            )}
          </div>
        )}

        {activeTab === 'processes' && (
          <div className="tab-content">
            <h2>Active Process Monitoring</h2>
            <div className="process-cards">
              <div className="process-card">
                <h3>Bayer Process Units</h3>
                <p className="status-active">5 Active</p>
                <p>Efficiency: 94%</p>
              </div>
              <div className="process-card">
                <h3>Material Analysis Queue</h3>
                <p className="status-pending">3 Pending</p>
                <p>Avg. Processing Time: 2.5 hrs</p>
              </div>
              <div className="process-card">
                <h3>By-Product Processing</h3>
                <p className="status-active">7 Active</p>
                <p>Recovery Rate: 88%</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content">
            <h2>System Configuration</h2>
            <div className="settings-form">
              <div className="setting-item">
                <label>Auto-approval threshold</label>
                <input type="number" defaultValue="80" />
                <span className="setting-desc">Minimum score for automatic user approval</span>
              </div>
              <div className="setting-item">
                <label>Alert notifications</label>
                <select defaultValue="all">
                  <option value="all">All Events</option>
                  <option value="critical">Critical Only</option>
                  <option value="none">None</option>
                </select>
                <span className="setting-desc">Configure system alert preferences</span>
              </div>
              <div className="setting-item">
                <label>Data retention period</label>
                <input type="number" defaultValue="365" />
                <span className="setting-desc">Days to retain historical data</span>
              </div>
              <button className="btn-save">Save Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;