package com.example.furniture_backend.serviceimpl;

import com.example.furniture_backend.dto.CartDTO;
import com.example.furniture_backend.entity.Cart;
import com.example.furniture_backend.entity.Product;
import com.example.furniture_backend.entity.User;
import com.example.furniture_backend.exception.ProductNotFoundException;
import com.example.furniture_backend.repository.CartRepository;
import com.example.furniture_backend.repository.ProductRepository;
import com.example.furniture_backend.repository.UserRepository;
import com.example.furniture_backend.service.CartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void addToCart(String email, Long productId) {

        User user = userRepository.findByEmail(email).get();

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException("Product not found"));

        Cart cart = cartRepository
                .findByUserAndProductId(user, productId)
                .orElse(new Cart());

        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cart.getQuantity() + 1);

        cartRepository.save(cart);
    }

    @Override
    public List<CartDTO> getCartItems(String email) {

        User user = userRepository.findByEmail(email).get();

        return cartRepository.findByUser(user)
                .stream()
                .map(cart -> new CartDTO(
                        cart.getProduct().getId(),
                        cart.getProduct().getName(),
                        cart.getProduct().getPrice(),
                        cart.getQuantity()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void removeFromCart(String email, Long productId) {

        User user = userRepository.findByEmail(email).get();

        Cart cart = cartRepository
                .findByUserAndProductId(user, productId)
                .orElseThrow(() ->
                        new ProductNotFoundException("Cart item not found"));

        cartRepository.delete(cart);
    }
}
