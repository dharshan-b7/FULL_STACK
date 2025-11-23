import {
  getByProducts,
  updateByProductStatus
} from "../services/byproductService";


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ByProductManagement.css";




const ByProductManagement = ({ user, onLogout }) => {
  const [byProducts, setByProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchByProducts();
  }, []);

  const fetchByProducts = async () => {
    try {
      const res = await getByProducts();
      setByProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching by-products:", err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
  try {
    await updateByProductStatus(id, newStatus);
    fetchByProducts();
  } catch (err) {
    console.error("Error updating status:", err);
  }
};





  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#fbbf24";
      case "processing": return "#3b82f6";
      case "completed": return "#10b981";
      case "recycled": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const filteredProducts =
    filter === "all"
      ? byProducts
      : byProducts.filter((bp) => bp.status === filter);

  return (
    <div className="byproduct-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>♻️ By-Product Management</h2>
        </div>
        <div className="nav-menu">
          <button onClick={() => navigate("/dashboard")} className="nav-link">
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
            {["all", "pending", "processing", "completed"].map((item) => (
              <button
                key={item}
                className={filter === item ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
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
                  onChange={(e) =>
                    handleStatusUpdate(product.id, e.target.value)
                  }
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
      </div>
    </div>
  );
};

export default ByProductManagement;
