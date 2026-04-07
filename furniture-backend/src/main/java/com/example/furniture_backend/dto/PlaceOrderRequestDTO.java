package com.example.furniture_backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PlaceOrderRequestDTO {

    @NotNull
    private Long productId;

    @Min(1)
    private int quantity = 1;

    // No-args constructor
    public PlaceOrderRequestDTO() {
    }

    // All-args constructor
    public PlaceOrderRequestDTO(Long productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    //Getters & Setters

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
