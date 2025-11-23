import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL + "/auth";

export const registerUser = (data) => {
  return axios.post(`${API_BASE}/register/`, data);
};

export const loginUser = (data) => {
  return axios.post(`${API_BASE}/login/`, data);
};
