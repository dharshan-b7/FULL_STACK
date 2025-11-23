import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ByProductManagement.css';
import { byproductService } from '../services/byproductService';


const ByProductManagement = ({ user, onLogout }) => {
  const [byProducts, setByProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchByProducts();
  }, []);


const fetchByProducts = async () => {
  try {
    const data = await byproductService.getByProducts();
    setByProducts(data.byProducts || []);
  } catch (err) {
    console.error('Error fetching by-products:', err);
  }
};

const handleStatusUpdate = async (id, newStatus) => {
  try {
    await byproductService.updateStatus(id, newStatus);
    fetchByProducts();
  } catch (err) {
    console.error('Error updating status:', err);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#fbbf24';
      case 'processing': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'recycled': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const filteredProducts = filter === 'all' 
    ? byProducts 
    : byProducts.filter(bp => bp.status === filter);

  return (
    <div className="byproduct-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>♻️ By-Product Management</h2>
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

      <div className="byproduct-content">
        <div className="content-header">
          <h1>By-Product Inventory</h1>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'processing' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('processing')}
            >
              Processing
            </button>
            <button 
              className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="byproduct-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="byproduct-card">
              <div className="card-header">
                <h3>{product.name}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(product.status) }}
                >
                  {product.status}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="label">Quantity:</span>
                  <span className="value">{product.quantity} kg</span>
                </div>
                <div className="info-row">
                  <span className="label">Source:</span>
                  <span className="value">{product.source}</span>
                </div>
                <div className="info-row">
                  <span className="label">Date:</span>
                  <span className="value">{product.date}</span>
                </div>
                <div className="info-row">
                  <span className="label">Potential Uses:</span>
                  <span className="value">{product.potentialUses}</span>
                </div>
              </div>

              <div className="card-footer">
                <select 
                  className="status-select"
                  value={product.status}
                  onChange={(e) => handleStatusUpdate(product.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="recycled">Recycled</option>
                </select>
                <button className="btn-details">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-data">
            <p>No by-products found for the selected filter</p>
          </div>
        )}

        <div className="insights-section">
          <h2>AI Insights & Recommendations</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>🔬 Red Mud Processing</h4>
              <p>Current red mud inventory can be processed for rare earth element extraction. Estimated value: $15,000</p>
            </div>
            <div className="insight-card">
              <h4>⚡ Energy Recovery</h4>
              <p>Manganese alloy by-products suitable for steel production. Potential partnership opportunity identified.</p>
            </div>
            <div className="insight-card">
              <h4>🌱 Sustainability Score</h4>
              <p>85% of by-products successfully recycled this month. Target: 90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByProductManagement;