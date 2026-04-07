package com.example.furniture_backend.repository;

import com.example.furniture_backend.entity.Cart;
import com.example.furniture_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/*
  CartRepository:
  - One row = one product in cart
*/
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(User user);

    Optional<Cart> findByUserAndProductId(User user, Long productId);

    void deleteByUser(User user);
}
