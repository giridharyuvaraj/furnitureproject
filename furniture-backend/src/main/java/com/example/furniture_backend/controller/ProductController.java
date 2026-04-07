package com.example.furniture_backend.controller;

import com.example.furniture_backend.dto.ProductDTO;
import com.example.furniture_backend.service.ProductService;
import com.example.furniture_backend.entity.User;
import com.example.furniture_backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final UserRepository userRepository;

    public ProductController(ProductService productService, UserRepository userRepository) {
        this.productService = productService;
        this.userRepository = userRepository;
    }

    private User requireAdmin(String headerEmail) {
        if (!StringUtils.hasText(headerEmail)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Admin email header missing");
        }
        User user = userRepository.findByEmail(headerEmail.trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required");
        }
        return user;
    }

    // ADMIN only (configured in SecurityConfig)
    @PostMapping
    public ProductDTO addProduct(
            @RequestBody ProductDTO productDTO,
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        requireAdmin(headerEmail);
        return productService.addProduct(productDTO);
    }

    // PUBLIC
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // PUBLIC
    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // ADMIN only
    @PutMapping("/{id}")
    public ProductDTO updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO,
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        requireAdmin(headerEmail);
        return productService.updateProduct(id, productDTO);
    }

    // ADMIN only
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        requireAdmin(headerEmail);
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}
