import axios from "axios";

const API = "http://127.0.0.1:8000/byproduct";

// ✔ Fetch all by-products
export const getByProducts = () => {
  return axios.get(`${API}/list/`);
};

// ✔ Add new by-product
export const addByProduct = (data) => {
  return axios.post(`${API}/add/`, data);
};

// ✔ Update status of by-product
export const updateByProductStatus = (id, status) => {
  return axios.put(`${API}/update/${id}/`, { status });
};
