package com.example.furniture_backend.service;

import com.example.furniture_backend.dto.CartDTO;

import java.util.List;

public interface CartService {

    void addToCart(String email, Long productId);

    List<CartDTO> getCartItems(String email);

    void removeFromCart(String email, Long productId);
}
