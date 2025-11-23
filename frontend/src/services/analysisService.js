import axios from "axios";

const API_URL = "http://127.0.0.1:8000/analysis/";

export const getMaterials = async () => {
  const res = await axios.get(`${API_URL}list/`);
  return res.data;
};

export const addMaterial = async (data) => {
  const res = await axios.post(`${API_URL}add/`, data);
  return res.data;
};

export const analyzeMaterial = async (materialData) => {
  const res = await axios.post(`${API_URL}analyze/`, materialData);
  return res;   // MaterialAnalysis.js already uses response.data
};
