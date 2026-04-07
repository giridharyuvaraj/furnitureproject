package com.example.furniture_backend.repository;

import com.example.furniture_backend.entity.Order;
import com.example.furniture_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
  OrderRepository:
  - Order history
  - Admin order management
*/
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
}
