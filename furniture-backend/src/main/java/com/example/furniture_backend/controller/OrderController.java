package com.example.furniture_backend.controller;

import com.example.furniture_backend.dto.OrderDTO;
import com.example.furniture_backend.dto.PlaceOrderRequestDTO;
import com.example.furniture_backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    private String resolveEmail(String headerEmail) {
        if (StringUtils.hasText(headerEmail)) return headerEmail.trim().toLowerCase();
        String name = SecurityContextHolder.getContext().getAuthentication() != null
                ? SecurityContextHolder.getContext().getAuthentication().getName()
                : null;
        if (StringUtils.hasText(name) && !"anonymousUser".equalsIgnoreCase(name)) return name.trim().toLowerCase();
        return null;
    }

    @PostMapping
    public OrderDTO placeOrder(
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        String email = resolveEmail(headerEmail);
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login to place order.");
        }

        return orderService.placeOrder(email);
    }

    /**
     * Place order from cart items (e.g. after Stripe payment success).
     * Body: [ { "productId": 1, "quantity": 2 }, ... ]
     */
    @PostMapping("/place-with-items")
    public ResponseEntity<OrderDTO> placeOrderFromItems(
            @Valid @RequestBody List<PlaceOrderRequestDTO> items,
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        String email = resolveEmail(headerEmail);
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login to place order.");
        }
        OrderDTO order = orderService.placeOrderFromItems(email, items);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping
    public List<OrderDTO> getOrders(
            @RequestHeader(value = "X-User-Email", required = false) String headerEmail
    ) {
        String email = resolveEmail(headerEmail);
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login to view orders.");
        }

        return orderService.getOrders(email);
    }
}
