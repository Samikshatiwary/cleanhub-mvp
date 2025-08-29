import { api } from "./api";

export async function fetchSales(range = "week") {
  const { data } = await api.get("/sales", { params: { range } });
  return data;
}

export async function fetchStats() {
  const { data } = await api.get("/stats");
  return data; 
}