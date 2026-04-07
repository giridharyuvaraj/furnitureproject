package com.example.furniture_backend.controller;

import com.example.furniture_backend.dto.CartDTO;
import com.example.furniture_backend.service.CartService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    private String resolveEmail(String headerEmail) {
        if (StringUtils.hasText(headerEmail)) return headerEmail.trim().toLowerCase();
        String name = SecurityContextHolder.getContext().getAuthentication() != null
                ? SecurityContextHolder.getContext().getAuthentication().getName()
                : null;
        if (StringUtils.hasText(name) && !"anonymousUser".equalsIgnoreCase(name)) return name.trim().toLowerCase();
        return null;
    }

    @PostMapping("/{productId}")
    public String addToCart(
            @PathVariable Long productId,
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        String email = resolveEmail(headerEmail);
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login to manage cart.");
        }

        cartService.addToCart(email, productId);
        return "Product added to cart";
    }

    @GetMapping
    public List<CartDTO> getCartItems(
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        String email = resolveEmail(headerEmail);
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login to view cart.");
        }

        return cartService.getCartItems(email);
    }

    @DeleteMapping("/{productId}")
    public String removeFromCart(
            @PathVariable Long productId,
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        String email = resolveEmail(headerEmail);
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login to manage cart.");
        }

        cartService.removeFromCart(email, productId);
        return "Product removed from cart";
    }
}
