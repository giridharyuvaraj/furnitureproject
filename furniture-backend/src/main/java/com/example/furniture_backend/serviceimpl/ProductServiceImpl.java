package com.example.furniture_backend.serviceimpl;

import com.example.furniture_backend.dto.ProductDTO;
import com.example.furniture_backend.entity.Product;
import com.example.furniture_backend.exception.ProductNotFoundException;
import com.example.furniture_backend.repository.ProductRepository;
import com.example.furniture_backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductDTO addProduct(ProductDTO dto) {

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
        product.setCategory(dto.getCategory());

        productRepository.save(product);

        dto.setId(product.getId());
        return dto;
    }

    @Override
    public List<ProductDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(p -> new ProductDTO(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getStock(),
                        p.getImageUrl(),
                        p.getCategory()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                product.getCategory()
        );
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImageUrl(dto.getImageUrl());
        product.setCategory(dto.getCategory());

        Product saved = productRepository.save(product);

        return new ProductDTO(
                saved.getId(),
                saved.getName(),
                saved.getDescription(),
                saved.getPrice(),
                saved.getStock(),
                saved.getImageUrl(),
                saved.getCategory()
        );
    }

    @Override
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
