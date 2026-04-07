package com.example.furniture_backend.service;

import java.util.Map;

public interface PaymentService {

    /**
     * Create a Stripe payment intent
     * @param amount Amount in rupees
     * @return Map containing clientSecret
     */
    Map<String, String> createPaymentIntent(double amount);

    /**
     * Process payment (legacy method)
     */
    String processPayment(double amount);
}