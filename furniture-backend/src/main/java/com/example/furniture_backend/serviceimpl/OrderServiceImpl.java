package com.example.furniture_backend.serviceimpl;

import com.example.furniture_backend.dto.OrderDTO;
import com.example.furniture_backend.dto.OrderItemDTO;
import com.example.furniture_backend.dto.PlaceOrderRequestDTO;
import com.example.furniture_backend.entity.Cart;
import com.example.furniture_backend.entity.Order;
import com.example.furniture_backend.entity.OrderItem;
import com.example.furniture_backend.entity.Product;
import com.example.furniture_backend.entity.User;
import com.example.furniture_backend.exception.OrderException;
import com.example.furniture_backend.exception.ProductNotFoundException;
import com.example.furniture_backend.repository.CartRepository;
import com.example.furniture_backend.repository.OrderRepository;
import com.example.furniture_backend.repository.ProductRepository;
import com.example.furniture_backend.repository.UserRepository;
import com.example.furniture_backend.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final com.example.furniture_backend.service.EmailService emailService;

    private static final DateTimeFormatter ORDER_DATE_FORMATTER =
            DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public OrderServiceImpl(
            CartRepository cartRepository,
            OrderRepository orderRepository,
            UserRepository userRepository,
            ProductRepository productRepository,
            com.example.furniture_backend.service.EmailService emailService) {

        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.emailService = emailService;
    }

    @Override
    public OrderDTO placeOrder(String email) {

        User user = userRepository.findByEmail(email).get();
        List<Cart> cartItems = cartRepository.findByUser(user);

        double total = cartItems.stream()
                .mapToDouble(c ->
                        c.getProduct().getPrice() * c.getQuantity())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setPaymentStatus("PAID");
        order.setOrderItems(new ArrayList<>());

        for (Cart cart : cartItems) {
            Product product = cart.getProduct();
            int qty = Math.max(1, cart.getQuantity());
            double price = product.getPrice();

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(product);
            oi.setQuantity(qty);
            oi.setPrice(price);
            order.getOrderItems().add(oi);
        }

        order.setTotalAmount(total);

        orderRepository.save(order);
        cartRepository.deleteByUser(user);

        // Send confirmation email
        try {
            emailService.sendOrderConfirmation(user.getEmail(), String.valueOf(order.getId()), order.getTotalAmount());
        } catch (Exception e) {
            System.err.println("❌ Could not send confirmation email: " + e.getMessage());
        }

        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(oi -> new OrderItemDTO(
                        oi.getProduct().getId(),
                        oi.getProduct().getName(),
                        oi.getQuantity(),
                        oi.getPrice(),
                        oi.getProduct().getImageUrl()
                ))
                .toList();

        String createdAt = order.getCreatedAt() != null
                ? ORDER_DATE_FORMATTER.format(order.getCreatedAt())
                : null;

        return new OrderDTO(order.getId(), total, "PAID", itemDTOs, createdAt);
    }

    @Override
    public OrderDTO placeOrderFromItems(String email, List<PlaceOrderRequestDTO> items) {
        if (items == null || items.isEmpty()) {
            throw new OrderException("No items to place order");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new OrderException("User not found"));
        Order order = new Order();
        order.setUser(user);
        order.setPaymentStatus("PAID");
        order.setOrderItems(new ArrayList<>());

        double total = 0;
        for (PlaceOrderRequestDTO req : items) {
            Product product = productRepository.findById(req.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException("Product not found: " + req.getProductId()));
            int qty = Math.max(1, req.getQuantity());
            double price = product.getPrice();
            total += price * qty;
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(product);
            oi.setQuantity(qty);
            oi.setPrice(price);
            order.getOrderItems().add(oi);
        }
        order.setTotalAmount(total);
        orderRepository.save(order);

        // Send confirmation email
        try {
            emailService.sendOrderConfirmation(user.getEmail(), String.valueOf(order.getId()), order.getTotalAmount());
        } catch (Exception e) {
            System.err.println("❌ Could not send confirmation email: " + e.getMessage());
        }

        List<OrderItemDTO> itemDTOs = order.getOrderItems().stream()
                .map(oi -> new OrderItemDTO(
                        oi.getProduct().getId(),
                        oi.getProduct().getName(),
                        oi.getQuantity(),
                        oi.getPrice(),
                        oi.getProduct().getImageUrl()
                ))
                .toList();

        String createdAt = order.getCreatedAt() != null
                ? ORDER_DATE_FORMATTER.format(order.getCreatedAt())
                : null;

        return new OrderDTO(order.getId(), total, "PAID", itemDTOs, createdAt);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrders(String email) {

        User user = userRepository.findByEmail(email).get();

        return orderRepository.findByUser(user)
                .stream()
                .map(o -> {
                    List<OrderItemDTO> itemDTOs;
                    List<OrderItem> items = o.getOrderItems();
                    if (items == null || items.isEmpty()) {
                        itemDTOs = Collections.emptyList();
                    } else {
                        itemDTOs = items.stream()
                                .map(oi -> new OrderItemDTO(
                                        oi.getProduct().getId(),
                                        oi.getProduct().getName(),
                                        oi.getQuantity(),
                                        oi.getPrice(),
                                        oi.getProduct().getImageUrl()
                                ))
                                .toList();
                    }

                    String createdAt = o.getCreatedAt() != null
                            ? ORDER_DATE_FORMATTER.format(o.getCreatedAt())
                            : null;

                    return new OrderDTO(
                            o.getId(),
                            o.getTotalAmount(),
                            o.getPaymentStatus(),
                            itemDTOs,
                            createdAt
                    );
                })
                .toList();
    }
}
