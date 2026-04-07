import api from "./api";

export const getAllProducts = () => {
  return api.get("/products");
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// ADMIN: Add product
export const addProduct = (product) => {
  return api.post("/products", product);
};

// ADMIN: Update product
export const updateProduct = (id, product) => {
  return api.put(`/products/${id}`, product);
};

// ADMIN: Delete product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};
