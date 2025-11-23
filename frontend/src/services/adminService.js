import api from './api';

export const adminService = {
  // Get pending users
  getPendingUsers: async () => {
    try {
      const response = await api.get('/admin/pending-users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch pending users' };
    }
  },

  // Approve or reject user
  approveUser: async (userId, approved) => {
    try {
      const response = await api.post(`/admin/approve-user/${userId}`, { approved });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to approve user' };
    }
  },

  // Get admin stats
  getAdminStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch admin stats' };
    }
  }
};