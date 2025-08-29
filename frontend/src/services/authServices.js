import { api } from "./api";
export async function loginService(email, password) {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return { ok: true, ...data };
  } catch (e) {
    return { ok: false, message: e?.response?.data?.message || "Login failed" };
  }
}

export async function signupService(name, email, password) {
  try {
    const { data } = await api.post("/auth/signup", { name, email, password });
    return { ok: true, ...data };
  } catch (e) {
    return { ok: false, message: e?.response?.data?.message || "Signup failed" };
  }
}