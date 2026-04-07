package com.example.furniture_backend.service;

import com.example.furniture_backend.dto.OrderDTO;
import com.example.furniture_backend.dto.PlaceOrderRequestDTO;

import java.util.List;

public interface OrderService {

    OrderDTO placeOrder(String email);

    /**
     * Place order from cart items (e.g. after payment success from frontend cart).
     */
    OrderDTO placeOrderFromItems(String email, List<PlaceOrderRequestDTO> items);

    List<OrderDTO> getOrders(String email);
}
