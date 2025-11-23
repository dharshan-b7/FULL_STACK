import api from './api';

export const byproductService = {
  // Get all by-products
  getByProducts: async () => {
    try {
      const response = await api.get('/byproducts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch by-products' };
    }
  },

  // Update by-product status
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/byproducts/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update status' };
    }
  }
};