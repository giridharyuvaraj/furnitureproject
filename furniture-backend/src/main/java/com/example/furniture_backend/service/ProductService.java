package com.example.furniture_backend.service;

import com.example.furniture_backend.dto.ProductDTO;

import java.util.List;

public interface ProductService {

    ProductDTO addProduct(ProductDTO productDTO);

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(Long id);

    ProductDTO updateProduct(Long id, ProductDTO productDTO);

    void deleteProduct(Long id);
}
