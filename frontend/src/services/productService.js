import axios from "axios";

const base = axios.create({ baseURL: "http://localhost:5000" });

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listProducts(params = {}) {
  
  const { data } = await base.get("/products", { params });
  return data; 
}

export async function getProduct(id) {
  const { data } = await base.get(`/products/${id}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await base.post("/products", payload, { headers: authHeader() });
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await base.put(`/products/${id}`, payload, { headers: authHeader() });
  return data;
}

export async function deleteProduct(id) {
  const { data } = await base.delete(`/products/${id}`, { headers: authHeader() });
  return data;
}