import api from './api';

export const analysisService = {
  // Analyze material
  analyzeMaterial: async (materialData) => {
    try {
      const response = await api.post('/analyze', materialData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Analysis failed' };
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch dashboard data' };
    }
  },

  // Get all materials
  getMaterials: async () => {
    try {
      const response = await api.get('/materials');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch materials' };
    }
  }
};