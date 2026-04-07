package com.example.furniture_backend.repository;

import com.example.furniture_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/*
  ProductRepository:
  - CRUD operations
  - Admin product management
*/
public interface ProductRepository extends JpaRepository<Product, Long> {
}
