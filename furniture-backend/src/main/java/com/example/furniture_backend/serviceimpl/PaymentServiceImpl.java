package com.example.furniture_backend.serviceimpl;

import com.example.furniture_backend.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
            throw new RuntimeException("Stripe secret key NOT configured");
        }
        Stripe.apiKey = stripeSecretKey;
        System.out.println("✅ Stripe initialized");
    }

    @Override
    public Map<String, String> createPaymentIntent(double amount) {
        Map<String, String> response = new HashMap<>();

        try {
            long amountInPaise = Math.round(amount * 100);

            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setAmount(amountInPaise)
                            .setCurrency("inr")
                            .setAutomaticPaymentMethods(
                                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                            .setEnabled(true)
                                            .build()
                            )
                            .build();

            PaymentIntent intent = PaymentIntent.create(params);
            response.put("clientSecret", intent.getClientSecret());

        } catch (StripeException e) {
            e.printStackTrace(); // VERY IMPORTANT
            response.put("error", e.getMessage());
        }

        return response;
    }

    @Override
    public String processPayment(double amount) {
        return "PAYMENT_SUCCESS";
    }
}