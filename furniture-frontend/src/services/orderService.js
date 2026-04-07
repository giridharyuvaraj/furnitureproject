import api from "./api";

/**
 * Place order from cart items (after payment success).
 * @param {Array<{ id: number, quantity?: number }>} cartItems - from Redux cart
 */
export const placeOrderWithItems = (cartItems) => {
  const body = (cartItems || []).map((item) => ({
    productId: item.id,
    quantity: item.quantity || 1
  }));
  return api.post("/orders/place-with-items", body);
};

/**
 * Get current user's orders.
 */
export const getOrders = () => {
  return api.get("/orders");
};
