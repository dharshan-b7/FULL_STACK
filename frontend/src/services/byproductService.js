import axios from "axios";

const API = "http://127.0.0.1:8000/byproduct";

export const getByProducts = () =>
  axios.get(`${API}/list/`).then(res => res.data);

export const addByProduct = (data) =>
  axios.post(`${API}/add/`, data).then(res => res.data);

export const updateByProductStatus = (id, status) =>
  axios.put(`${API}/update/${id}/`, { status }).then(res => res.data);
