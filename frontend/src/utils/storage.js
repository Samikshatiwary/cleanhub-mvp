import { CART_KEY, TOKEN_KEY } from "./constants";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const getCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
};
export const setCart = (arr) => localStorage.setItem(CART_KEY, JSON.stringify(arr));
export const clearCart = () => localStorage.removeItem(CART_KEY);

export const addToCart = (product, qty = 1) => {
  const cart = getCart();
  const idx = cart.findIndex((c) => c._id === product._id);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ _id: product._id, name: product.name, price: product.price, category: product.category, qty });
  setCart(cart);
  return cart;
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((c) => c._id !== id);
  setCart(cart);
  return cart;
};

export const updateQty = (id, qty) => {
  const cart = getCart().map((c) => (c._id === id ? { ...c, qty: Math.max(1, Number(qty) || 1) } : c));
  setCart(cart);
  return cart;
};