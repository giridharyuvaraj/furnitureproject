package com.example.furniture_backend.serviceimpl;

import com.example.furniture_backend.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOrderConfirmation(String toEmail, String orderId, double amount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Order Confirmed! Order ID: " + orderId);
        message.setText("Thank you for shopping with us!\n" +
                "Your order has been placed successfully.\n\n" +
                "Order Details:\n" +
                "Order ID: " + orderId + "\n" +
                "Total Amount: ₹" + amount + "\n\n" +
                "We are preparing your furniture for shipment. We'll notify you when it's on the way.");

        mailSender.send(message);
        System.out.println("✅ Order confirmation email sent to: " + toEmail);
    }

    @Override
    public void sendPasswordResetEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request");
        
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        
        message.setText("Hello,\n\n" +
                "You have requested to reset your password.\n" +
                "Click the link below to reset your password:\n" +
                resetLink + "\n\n" +
                "If you did not request this, please ignore this email.\n");

        mailSender.send(message);
        System.out.println("✅ Password reset email sent to: " + toEmail);
    }
}
