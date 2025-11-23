import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MaterialAnalysis.css';
import { analyzeMaterial } from "../services/analysisService";

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
      const response = await analyzeMaterial(materialData);
      setPrediction(response.data);
    } catch (err) {
      console.error("Error analyzing material:", err);
      alert("Analysis failed. Please try again.");
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
          
          {/* FORM SECTION */}
          <div className="input-section">
            <h2>Material Input</h2>
            <form onSubmit={handleAnalyze} className="analysis-form">

              <div className="form-group">
                <label>Material Type</label>
                <select name="materialType" value={materialData.materialType} onChange={handleChange} required>
                  <option value="">Select material type</option>
                  <option value="bauxite">Bauxite Ore</option>
                  <option value="scrap">Aluminum Scrap</option>
                  <option value="dross">Aluminum Dross</option>
                  <option value="recycled">Recycled Material</option>
                </select>
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input type="number" name="weight" value={materialData.weight} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Purity (%)</label>
                <input type="number" name="purity" value={materialData.purity} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Source</label>
                <input type="text" name="source" value={materialData.source} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea name="notes" value={materialData.notes} onChange={handleChange} rows="3" />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Material"}
              </button>

            </form>
          </div>

          {/* RESULTS SECTION */}
          <div className="results-section">
            <h2>Analysis Results</h2>

            {prediction ? (
              <div className="prediction-results">
                <div className="result-card highlight">
                  <h3>Predicted Aluminum Yield</h3>
                  <div className="result-value">{prediction.aluminumYield}%</div>
                  <p>~{prediction.aluminumWeight} kg of aluminum</p>
                </div>

                <div className="result-card">
                  <h4>By-Products</h4>
                  <ul>
                    {prediction.byProducts.map((bp, index) => (
                      <li key={index}>{bp.name}: {bp.quantity} kg</li>
                    ))}
                  </ul>
                </div>

                <div className="result-card">
                  <h4>Recommendation</h4>
                  <p>{prediction.recommendation}</p>
                </div>

                <button className="btn-secondary" onClick={() => setPrediction(null)}>
                  New Analysis
                </button>
              </div>
            ) : (
              <p className="no-results">Enter details and click "Analyze Material"</p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default MaterialAnalysis;
