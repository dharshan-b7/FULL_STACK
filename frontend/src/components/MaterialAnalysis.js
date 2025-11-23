import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MaterialAnalysis.css';
import { analysisService } from '../services/analysisService';

const MaterialAnalysis = ({ user, onLogout }) => {
  const [materialData, setMaterialData] = useState({
    materialType: '',
    weight: '',
    purity: '',
    source: '',
    notes: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMaterialData({
      ...materialData,
      [e.target.name]: e.target.value
    });
  };

const handleAnalyze = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await analysisService.analyzeMaterial(materialData);
    setPrediction(data.prediction);
  } catch (err) {
    console.error('Error analyzing material:', err);
    alert('Analysis failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="analysis-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🔬 Material Analysis</h2>
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

      <div className="analysis-content">
        <div className="analysis-grid">
          <div className="input-section">
            <h2>Material Input</h2>
            <form onSubmit={handleAnalyze} className="analysis-form">
              <div className="form-group">
                <label htmlFor="materialType">Material Type</label>
                <select
                  id="materialType"
                  name="materialType"
                  value={materialData.materialType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select material type</option>
                  <option value="bauxite">Bauxite Ore</option>
                  <option value="scrap">Aluminum Scrap</option>
                  <option value="dross">Aluminum Dross</option>
                  <option value="recycled">Recycled Material</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={materialData.weight}
                  onChange={handleChange}
                  placeholder="Enter weight in kg"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="purity">Estimated Purity (%)</label>
                <input
                  type="number"
                  id="purity"
                  name="purity"
                  value={materialData.purity}
                  onChange={handleChange}
                  placeholder="Enter purity percentage"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="source">Source/Origin</label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={materialData.source}
                  onChange={handleChange}
                  placeholder="Enter material source"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={materialData.notes}
                  onChange={handleChange}
                  placeholder="Any additional information..."
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Analyze Material'}
              </button>
            </form>
          </div>

          <div className="results-section">
            <h2>Analysis Results</h2>
            {prediction ? (
              <div className="prediction-results">
                <div className="result-card highlight">
                  <h3>Predicted Aluminum Yield</h3>
                  <div className="result-value">{prediction.aluminumYield}%</div>
                  <p className="result-subtitle">
                    ~{prediction.aluminumWeight} kg of aluminum
                  </p>
                </div>

                <div className="result-card">
                  <h4>By-Products</h4>
                  <ul className="byproduct-list">
                    {prediction.byProducts.map((bp, index) => (
                      <li key={index}>
                        <strong>{bp.name}</strong>: {bp.quantity} kg ({bp.percentage}%)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="result-card">
                  <h4>Processing Recommendation</h4>
                  <p>{prediction.recommendation}</p>
                </div>

                <div className="result-card">
                  <h4>Efficiency Score</h4>
                  <div className="efficiency-bar">
                    <div 
                      className="efficiency-fill"
                      style={{ width: `${prediction.efficiencyScore}%` }}
                    >
                      {prediction.efficiencyScore}%
                    </div>
                  </div>
                </div>

                <button className="btn-secondary" onClick={() => setPrediction(null)}>
                  New Analysis
                </button>
              </div>
            ) : (
              <div className="no-results">
                <p>Enter material details and click "Analyze Material" to see predictions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialAnalysis;