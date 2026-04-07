package com.example.furniture_backend.service;

public interface EmailService {
    void sendOrderConfirmation(String toEmail, String orderId, double amount);
    void sendPasswordResetEmail(String toEmail, String token);
}
