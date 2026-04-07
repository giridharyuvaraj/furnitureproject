import api from "./api";

export const getCart = () => {
  return api.get("/cart");
};

export const addToCart = (productId) => {
  return api.post(`/cart/${productId}`);
};

export const removeFromCart = (productId) => {
  return api.delete(`/cart/${productId}`);
};
